"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  FlaskConical,
  KeyRound,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import AuthFeedback from "@/app/components/auth/AuthFeedback";
import Button from "@/app/components/ui/Button";
import { AuthApiError, getCurrentUser, postAuth } from "@/app/lib/auth-client";

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((user) => {
        if (active) setUsername(user.username);
      })
      .catch((error: unknown) => {
        if (!active) return;
        if (error instanceof AuthApiError && error.status === 401) {
          router.replace("/login");
          return;
        }
        setLoadError(
          error instanceof Error ? error.message : "Could not load your account.",
        );
      })
      .finally(() => {
        if (active) setLoadingUser(false);
      });

    return () => {
      active = false;
    };
  }, [router]);

  async function handleAccountRetry() {
    setLoadingUser(true);
    setLoadError("");
    try {
      const user = await getCurrentUser();
      setUsername(user.username);
    } catch (error) {
      if (error instanceof AuthApiError && error.status === 401) {
        router.replace("/login");
        return;
      }
      setLoadError(
        error instanceof Error ? error.message : "Could not load your account.",
      );
    } finally {
      setLoadingUser(false);
    }
  }

  async function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    setChangingPassword(true);
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await postAuth("me/change-password", {
        current_password: String(formData.get("current_password")),
        new_password: String(formData.get("new_password")),
      });
      setPasswordSuccess("Your password has been updated.");
      form.reset();
    } catch (error) {
      if (error instanceof AuthApiError && error.status === 401) {
        router.replace("/login");
        return;
      }
      setPasswordError(
        error instanceof Error
          ? error.message
          : "Could not update your password. Please try again.",
      );
    } finally {
      setChangingPassword(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Could not sign out. Please try again.");
      }
      router.replace("/login");
      router.refresh();
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Could not sign out.",
      );
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2 font-bold text-brand">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-on-brand">
              λ
            </span>
            PyLambda
          </Link>
          <Button
            variant="secondary"
            size="sm"
            loading={signingOut}
            icon={<LogOut />}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
            Your workspace
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {loadingUser
              ? "Loading your account…"
              : username
                ? `Welcome, ${username}`
                : "Welcome to PyLambda"}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Your account is ready. We’re preparing the PyLambda service testing
            tools and will let you know when they’re available.
          </p>
          {loadError && (
            <div className="mt-5 max-w-xl space-y-3">
              <AuthFeedback kind="error">{loadError}</AuthFeedback>
              <Button
                variant="secondary"
                size="sm"
                loading={loadingUser}
                onClick={handleAccountRetry}
              >
                Try again
              </Button>
            </div>
          )}
        </section>

        <section
          aria-labelledby="availability-heading"
          className="mt-10 overflow-hidden rounded-3xl border border-brand/20 bg-brand/5 p-7 sm:p-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-pending/25 bg-pending-bg px-3 py-1 text-xs font-semibold text-pending">
                <span className="h-2 w-2 animate-pulse rounded-full bg-pending" />
                In development
              </span>
              <h2
                id="availability-heading"
                className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Service testing is coming soon
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                We’re building the tools to help you test your services from one
                place. Your workspace will be ready as soon as the service
                launches.
              </p>
            </div>
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand text-on-brand">
              <FlaskConical aria-hidden="true" className="h-8 w-8" />
            </div>
          </div>
          <div className="mt-8 grid gap-3 border-t border-brand/15 pt-6 sm:grid-cols-3">
            {[
              "Create an account",
              "Get your workspace ready",
              "Testing services launch soon",
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-3 text-sm">
                {index < 2 ? (
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-success"
                  />
                ) : (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-pending"
                  />
                )}
                <span className="text-foreground">{step}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="account-heading"
          className="mt-10 grid gap-8 rounded-3xl border border-border bg-surface p-7 sm:grid-cols-[1fr_1.2fr] sm:p-9"
        >
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <ShieldCheck aria-hidden="true" className="h-6 w-6" />
            </div>
            <h2 id="account-heading" className="mt-4 text-xl font-semibold">
              Account security
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Change your password any time. You can also use the password
              recovery link if you no longer know your current password.
            </p>
            <Link
              href="/forgot-password"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
            >
              Reset a forgotten password
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <form className="space-y-4" onSubmit={handlePasswordChange}>
            {passwordSuccess && (
              <AuthFeedback kind="success">{passwordSuccess}</AuthFeedback>
            )}
            {passwordError && (
              <AuthFeedback kind="error">{passwordError}</AuthFeedback>
            )}
            <label className="block text-sm font-medium">
              Current password
              <input
                className={fieldClass}
                type="password"
                name="current_password"
                autoComplete="current-password"
                minLength={8}
                maxLength={128}
                required
              />
            </label>
            <label className="block text-sm font-medium">
              New password
              <input
                className={fieldClass}
                type="password"
                name="new_password"
                autoComplete="new-password"
                minLength={8}
                maxLength={128}
                required
              />
            </label>
            <Button
              type="submit"
              size="sm"
              loading={changingPassword}
              icon={<KeyRound />}
            >
              Update password
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
