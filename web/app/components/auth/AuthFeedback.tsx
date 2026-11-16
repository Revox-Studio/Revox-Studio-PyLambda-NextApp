interface AuthFeedbackProps {
  kind: "success" | "error";
  children: string;
}

export default function AuthFeedback({ kind, children }: AuthFeedbackProps) {
  const styles =
    kind === "success"
      ? "border-success/30 bg-success-bg text-success"
      : "border-error/30 bg-error-bg text-error";

  return (
    <p
      role={kind === "error" ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-sm leading-5 ${styles}`}
    >
      {children}
    </p>
  );
}
