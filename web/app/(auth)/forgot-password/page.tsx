"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import AuthCard from "@/app/components/auth/AuthCard";
import AuthFeedback from "@/app/components/auth/AuthFeedback";
import Button from "@/app/components/ui/Button";
import { postAuth } from "@/app/lib/auth-client";

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function ForgotPasswordPage() {
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      await postAuth("forgot-password", {
        useremail: String(formData.get("useremail")),
      });
      setSent(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not send the reset email. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      eyebrow="Account recovery"
      title="Forgot your password?"
      description="Enter your account email and we’ll send a link to reset your password."
      footer={
        <p>
          Remembered it?{" "}
          <Link className="font-semibold text-brand hover:underline" href="/login">
            Back to sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {sent && (
          <AuthFeedback kind="success">
            If an account matches that email, a password reset link is on its way.
            Check your inbox.
          </AuthFeedback>
        )}
        {error && <AuthFeedback kind="error">{error}</AuthFeedback>}
        <label className="block text-sm font-medium text-foreground">
          Email address
          <input
            className={fieldClass}
            type="email"
            name="useremail"
            autoComplete="email"
            maxLength={255}
            required
          />
        </label>
        <Button
          type="submit"
          size="md"
          loading={loading}
          icon={<Mail />}
          className="w-full"
        >
          Send reset link
        </Button>
      </form>
    </AuthCard>
  );
}
