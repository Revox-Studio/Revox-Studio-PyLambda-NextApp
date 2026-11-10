import Button from "@/app/components/ui/Button";

export default function RegisterPage() {
  return (
    <main className="w-full max-w-md rounded-[28px] border border-border bg-surface p-8 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Create account
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-foreground">Register</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Set up your account and get started in minutes.
      </p>

      <Button variant="primary" size="lg" className="mt-8 w-full">
        Create account
      </Button>
    </main>
  );
}
