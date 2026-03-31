"use client";

import { track } from "@vercel/analytics";
import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  /** Vercel Analytics event name, e.g. "kalkschutz_cta_click" */
  eventName: string;
  eventProps?: Record<string, string>;
};

/**
 * Drop-in replacement for the locale-aware Link component.
 * Fires a Vercel Analytics track() event on click before navigating.
 */
export default function TrackedLink({ eventName, eventProps, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(eventName, eventProps);
        onClick?.(e);
      }}
    />
  );
}
