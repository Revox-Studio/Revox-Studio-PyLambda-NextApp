import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";
type IconPosition = "left" | "right";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  disabled,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-3 rounded-full font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[#f0f0f0] text-black hover:bg-white active:scale-[0.97]",
    secondary:
      "border-2 border-border bg-transparent text-foreground hover:bg-surface active:scale-[0.97]",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-4 text-base",
    lg: "px-9 py-5 text-lg",
  };

  // Icons scale with the button text size
  const iconSizes: Record<ButtonSize, string> = {
    sm: "[&>svg]:h-4 [&>svg]:w-4",
    md: "[&>svg]:h-5 [&>svg]:w-5",
    lg: "[&>svg]:h-6 [&>svg]:w-6",
  };

  const iconWrapper = icon ? (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${iconSizes[size]}`}
    >
      {icon}
    </span>
  ) : null;

  const spinner = (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  );

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Left side: spinner replaces a left icon while loading */}
      {loading ? spinner : iconPosition === "left" && iconWrapper}

      {children}

      {/* Right side */}
      {iconPosition === "right" && iconWrapper}
    </button>
  );
};

export default Button;