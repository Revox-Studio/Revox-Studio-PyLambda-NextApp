import { cookies } from "next/headers";

const backendUrl = (
  process.env.BACKEND_API_URL ?? "https://pylambda-7dba9411.fastapicloud.dev"
).replace(/\/+$/, "");
const sessionCookie = "pylambda_session";

const allowedRoutes: Record<string, { method: "GET" | "POST"; path: string }> = {
  signup: { method: "POST", path: "signup" },
  login: { method: "POST", path: "login" },
  "forgot-password": { method: "POST", path: "forgot-password" },
  "reset-password": { method: "POST", path: "reset-password" },
  me: { method: "GET", path: "me" },
  "me/change-password": { method: "POST", path: "me/change-password" },
};

async function proxyAuthRequest(
  request: Request,
  context: RouteContext<"/api/auth/[...path]">,
) {
  const { path } = await context.params;
  const route = allowedRoutes[path.join("/")];

  if (!route || route.method !== request.method) {
    return Response.json({ detail: "Authentication route not found." }, { status: 404 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie)?.value;
  if (route.path.startsWith("me") && !token) {
    return Response.json({ detail: "You are not signed in." }, { status: 401 });
  }

  const headers = new Headers({ Accept: "application/json" });
  if (request.method === "POST") {
    headers.set("Content-Type", "application/json");
  }
  if (token && route.path.startsWith("me")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let body: string | undefined;
  if (request.method === "POST") {
    body = await request.text();
  }

  let backendResponse: Response;
  try {
    backendResponse = await fetch(`${backendUrl}/v1/auth/${route.path}`, {
      method: route.method,
      headers,
      body,
      cache: "no-store",
    });
  } catch {
    return Response.json(
      { detail: "Could not reach the authentication service. Please try again." },
      { status: 502 },
    );
  }

  const responseText = await backendResponse.text();
  let responseBody: unknown = null;
  if (responseText) {
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = { detail: responseText };
    }
  }

  if (route.path === "login" && backendResponse.ok) {
    if (
      typeof responseBody !== "object" ||
      responseBody === null ||
      !("access_token" in responseBody) ||
      typeof responseBody.access_token !== "string" ||
      !("expires_in" in responseBody) ||
      typeof responseBody.expires_in !== "number"
    ) {
      return Response.json(
        { detail: "The authentication service returned an invalid login response." },
        { status: 502 },
      );
    }

    const response = Response.json({ message: "Signed in successfully." });
    response.headers.append(
      "Set-Cookie",
      `${sessionCookie}=${encodeURIComponent(responseBody.access_token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.max(0, responseBody.expires_in)}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
    );
    return response;
  }

  return Response.json(responseBody, { status: backendResponse.status });
}

export async function GET(
  request: Request,
  context: RouteContext<"/api/auth/[...path]">,
) {
  return proxyAuthRequest(request, context);
}

export async function POST(
  request: Request,
  context: RouteContext<"/api/auth/[...path]">,
) {
  return proxyAuthRequest(request, context);
}
