"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { KeyRound } from "lucide-react";
import AuthCard from "@/app/components/auth/AuthCard";
import AuthFeedback from "@/app/components/auth/AuthFeedback";
import Button from "@/app/components/ui/Button";
import { postAuth } from "@/app/lib/auth-client";

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function ResetPasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      setError("This reset link is missing its token. Request a new reset email.");
      setLoading(false);
      return;
    }

    try {
      await postAuth("reset-password", {
        token,
        new_password: String(formData.get("new_password")),
      });
      setSuccess(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not reset your password. Request a new link and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      eyebrow="Account recovery"
      title="Choose a new password"
      description="Enter a new password to finish resetting your PyLambda account."
      footer={
        <p>
          Need another link?{" "}
          <Link
            className="font-semibold text-brand hover:underline"
            href="/forgot-password"
          >
            Request a new reset email
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {success && (
          <AuthFeedback kind="success">
            Your password has been changed. You can now sign in.
          </AuthFeedback>
        )}
        {error && <AuthFeedback kind="error">{error}</AuthFeedback>}
        <label className="block text-sm font-medium text-foreground">
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
          size="md"
          loading={loading}
          icon={<KeyRound />}
          className="w-full"
        >
          Change password
        </Button>
        {success && (
          <Link
            href="/login"
            className="block text-center text-sm font-semibold text-brand hover:underline"
          >
            Go to sign in
          </Link>
        )}
      </form>
    </AuthCard>
  );
}
