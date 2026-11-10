"use client"; // needed for the dismiss button (useState)

import { useState } from "react";
import type { ReactNode } from "react";

interface NoticeBarProps {
  children: ReactNode; 
  icon?: ReactNode;
  linkText?: string;
  href?: string;
  dismissible?: boolean;
  className?: string;
}

const NoticeBar = ({
  children,
  icon,
  linkText,
  href,
  dismissible = true,
  className = "",
}: NoticeBarProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      role="status"
      className={`relative w-full border-b border-border bg-brand px-10 py-2.5 text-center text-sm ${className}`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {icon && (
          <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center [&>svg]:h-4 [&>svg]:w-4"
          >
            {icon}
          </span>
        )}

        <p className="text-white/80">{children}</p>

        {linkText && href && (
          <a
            href={href}
            className="font-medium text-white underline underline-offset-4 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {linkText}
          </a>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss notice"
          className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-4 w-4"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default NoticeBar;