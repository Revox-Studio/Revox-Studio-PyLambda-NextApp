"use client"; // needed in Next.js App Router, safe to keep elsewhere

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function WelcomeTest() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) return;

      // Text slides in from the left and settles in place (left -> right)
      gsap.from(".welcome-text", {
        x: -200,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <h1
        className="welcome-text"
        style={{
          color: "#22c55e", // green
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
          fontWeight: 700,
          margin: 0,
        }}
      >
        Welcome
      </h1>
    </div>
  );
}