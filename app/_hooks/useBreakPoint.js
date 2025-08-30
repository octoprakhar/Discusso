"use client";

import { useState, useEffect } from "react";

export function useBreakPoint() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  ); // default to desktop

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    handler(); // run once on mount
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return {
    isMobile: width !== null ? width < 640 : null,
    isTablet: width !== null ? width >= 640 && width < 1024 : null,
    isDesktop: width !== null ? width >= 1024 && width < 1536 : null,
    isBiggerDesktop: width !== null ? width >= 1536 : null,
    hasMounted: width !== null,
  };
}
