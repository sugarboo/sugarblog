"use client";
import type { MouseEvent } from "react";
import { flushSync } from "react-dom";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ToggleTheme() {
  const { theme, systemTheme, setTheme } = useTheme();
  const isDark =
    theme === "dark" || (systemTheme === "dark" && theme !== "light");

  const toggleTheme = async (event: MouseEvent) => {
    const newTheme = isDark ? "light" : "dark";

    const isAppearanceTransition =
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isAppearanceTransition) {
      setTheme(newTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    const transition = (document as any).startViewTransition(() => {
      // Use flushSync to ensure DOM updates synchronously
      flushSync(() => {
        setTheme(newTheme);
      });
    });
    await transition.ready;

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];

    document.documentElement.animate(
      {
        clipPath: isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: "ease-out",
        pseudoElement: isDark
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      },
    );
  };

  return (
    <Button
      size="icon"
      className="rounded-full outline-hidden text-muted-foreground cursor-pointer bg-linear-to-br backdrop-blur-3xl saturate-150 hover:bg-transparent hover:from-pink-50 hover:via-purple-50 hover:to-cyan-50 dark:hover:from-pink-950 dark:hover:via-purple-950 dark:hover:to-cyan-950"
      onClick={(event) => toggleTheme(event)}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
