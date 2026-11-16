import Link from "next/link";
import type { ReactNode } from "react";

interface AuthCardProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <main className="w-full max-w-md rounded-3xl border border-border bg-surface p-7 shadow-xl shadow-black/5 sm:p-9">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold tracking-tight text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-on-brand">
          λ
        </span>
        PyLambda
      </Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <div className="mt-7">{children}</div>
      <div className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
        {footer}
      </div>
    </main>
  );
}
