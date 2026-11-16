"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { UserPlus } from "lucide-react";
import AuthCard from "@/app/components/auth/AuthCard";
import AuthFeedback from "@/app/components/auth/AuthFeedback";
import Button from "@/app/components/ui/Button";
import { postAuth } from "@/app/lib/auth-client";

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      await postAuth("signup", {
        username: String(formData.get("username")),
        useremail: String(formData.get("useremail")),
        password: String(formData.get("password")),
      });
      setSuccess(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      eyebrow="Get started"
      title="Create your account"
      description="Sign up to get ready for the PyLambda service launch."
      footer={
        <p>
          Already have an account?{" "}
          <Link className="font-semibold text-brand hover:underline" href="/login">
            Sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {success && (
          <AuthFeedback kind="success">
            Your account is ready. You can now sign in.
          </AuthFeedback>
        )}
        {error && <AuthFeedback kind="error">{error}</AuthFeedback>}
        <label className="block text-sm font-medium text-foreground">
          Username
          <input
            className={fieldClass}
            type="text"
            name="username"
            autoComplete="username"
            minLength={3}
            maxLength={50}
            required
          />
        </label>
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
        <label className="block text-sm font-medium text-foreground">
          Password
          <input
            className={fieldClass}
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            required
          />
          <span className="mt-1 block text-xs text-muted-foreground">
            Use at least 8 characters.
          </span>
        </label>
        <Button
          type="submit"
          size="md"
          loading={loading}
          icon={<UserPlus />}
          className="w-full"
        >
          Create account
        </Button>
      </form>
    </AuthCard>
  );
}
