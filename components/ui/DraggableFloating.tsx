"use client";

/**
 * DraggableFloating — wraps any floating button and makes it
 * repositionable via touch drag on mobile.
 *
 * - Desktop: buttons stay at their default bottom/right position (no drag).
 * - Mobile: long-press or drag to move; position is persisted in localStorage.
 * - Tap vs drag: movement < 6 px → treated as a normal tap (click fires).
 */

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";

const BTN_SIZE   = 56; // w-14 / h-14 = 56 px
const EDGE_GAP   = 8;  // min distance from any viewport edge
const DRAG_START = 6;  // px of movement before drag mode activates

interface Props {
  children: ReactNode;
  /** localStorage key – must be unique per floating button */
  storageKey: string;
  /** Pixels from the bottom of the viewport (default 24 = Tailwind bottom-6) */
  defaultBottom?: number;
  /** Pixels from the right  of the viewport (default 24 = Tailwind right-6)  */
  defaultRight?: number;
  zIndex?: number;
}

export default function DraggableFloating({
  children,
  storageKey,
  defaultBottom = 24,
  defaultRight  = 24,
  zIndex        = 50,
}: Props) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const drag = useRef({
    active : false,
    moved  : false,
    startX : 0,
    startY : 0,
    origX  : 0,
    origY  : 0,
  });

  /* ── clamp inside viewport ─────────────────────────────────────────────── */
  const clamp = useCallback((x: number, y: number) => ({
    x: Math.max(EDGE_GAP, Math.min(window.innerWidth  - BTN_SIZE - EDGE_GAP, x)),
    y: Math.max(EDGE_GAP, Math.min(window.innerHeight - BTN_SIZE - EDGE_GAP, y)),
  }), []);

  /* ── initialise position (client-only) ────────────────────────────────── */
  useEffect(() => {
    const defaultX = window.innerWidth  - defaultRight  - BTN_SIZE;
    const defaultY = window.innerHeight - defaultBottom - BTN_SIZE;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const { x, y } = JSON.parse(saved) as { x: number; y: number };
        setPos(clamp(x, y));
        return;
      }
    } catch {
      /* ignore */
    }
    setPos({ x: defaultX, y: defaultY });
  }, [storageKey, defaultBottom, defaultRight, clamp]);

  /* ── touch handlers ────────────────────────────────────────────────────── */
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const t = e.touches[0];
      drag.current = {
        active : true,
        moved  : false,
        startX : t.clientX,
        startY : t.clientY,
        origX  : pos?.x ?? 0,
        origY  : pos?.y ?? 0,
      };
    },
    [pos],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const d = drag.current;
      if (!d.active) return;
      const t  = e.touches[0];
      const dx = t.clientX - d.startX;
      const dy = t.clientY - d.startY;
      if (!d.moved && Math.hypot(dx, dy) < DRAG_START) return;
      d.moved = true;
      setPos(clamp(d.origX + dx, d.origY + dy));
    },
    [clamp],
  );

  const onTouchEnd = useCallback(() => {
    drag.current.active = false;
    if (drag.current.moved) {
      setPos((prev) => {
        if (prev) localStorage.setItem(storageKey, JSON.stringify(prev));
        return prev;
      });
    }
  }, [storageKey]);

  /* ── suppress click that fires after a drag gesture ───────────────────── */
  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false; // reset so next tap works normally
    }
  }, []);

  /* ── SSR guard ─────────────────────────────────────────────────────────── */
  if (!pos) return null;

  return (
    <div
      style={{
        position          : "fixed",
        left              : pos.x,
        top               : pos.y,
        zIndex,
        touchAction       : "none",
        userSelect        : "none",
        WebkitUserSelect  : "none",
      }}
      onTouchStart  ={onTouchStart}
      onTouchMove   ={onTouchMove}
      onTouchEnd    ={onTouchEnd}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>
  );
}
