import type { CSSProperties } from "react";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  className?: string;
}

/** Shimmering placeholder block, driven by the DS `iperia-shimmer` keyframes. */
export function Skeleton({ width = "100%", height = 12, circle = false, className = "" }: SkeletonProps) {
  const style: CSSProperties = {
    width: circle ? height : width,
    height,
    borderRadius: circle ? "var(--radius-pill)" : "var(--radius-sm)",
    background:
      "linear-gradient(90deg,var(--surface-200) 0%,var(--gray-300) 50%,var(--surface-200) 100%)",
    backgroundSize: "320px 100%",
    animation: "iperia-shimmer 1.2s linear infinite",
  };
  return <span aria-hidden className={`block ${className}`} style={style} />;
}
