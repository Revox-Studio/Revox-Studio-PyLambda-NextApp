export async function POST() {
  const response = Response.json({ message: "Signed out successfully." });
  response.headers.append(
    "Set-Cookie",
    "pylambda_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
  );
  return response;
}
