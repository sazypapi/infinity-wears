"use client";
import { useEffect } from "react";

export default function ScrollbarWidth() {
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${scrollbarWidth}px`,
    );
  }, []);

  return null;
}
