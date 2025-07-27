import React from "react";

export function Separator({ className = "" }) {
  return (
    <div
      className={`shrink-0 bg-border h-[1px] w-full my-4 ${className}`}
    />
  );
}
