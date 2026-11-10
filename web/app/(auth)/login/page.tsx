"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import AuthCard from "@/app/components/auth/AuthCard";
import AuthFeedback from "@/app/components/auth/AuthFeedback";
import Button from "@/app/components/ui/Button";
import { postAuth } from "@/app/lib/auth-client";

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      await postAuth("login", {
        useremail: String(formData.get("useremail")),
        password: String(formData.get("password")),
      });
      router.replace("/dashboard");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Sign in to PyLambda"
      description="Continue to your account and service workspace."
      footer={
        <p>
          New to PyLambda?{" "}
          <Link className="font-semibold text-brand hover:underline" href="/register">
            Create an account
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
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
        <label className="block text-sm font-medium text-foreground">
          Password
          <input
            className={fieldClass}
            type="password"
            name="password"
            autoComplete="current-password"
            minLength={8}
            maxLength={128}
            required
          />
        </label>
        <div className="-mt-2 text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-brand hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          size="md"
          loading={loading}
          icon={<ArrowRight />}
          iconPosition="right"
          className="w-full"
        >
          Sign in
        </Button>
      </form>
    </AuthCard>
  );
}
