import { useEffect, useRef, useState } from "react";

export function useResizableSplit({
  initialSplit = 50,
  minSplit = 25,
  maxSplit = 75,
  breakpoint = 680,
} = {}) {
  const [split, setSplit] = useState(initialSplit);
  const [narrow, setNarrow] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= breakpoint,
  );
  const containerRef = useRef(null);
  const dragging = useRef(false);

  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  const update = (event) => {
    if (!dragging.current || narrow || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nextSplit = ((event.clientX - rect.left) / rect.width) * 100;
    setSplit(Math.max(minSplit, Math.min(maxSplit, nextSplit)));
  };

  const dividerProps = {
    role: "separator",
    tabIndex: narrow ? -1 : 0,
    "aria-valuemin": minSplit,
    "aria-valuemax": maxSplit,
    "aria-valuenow": Math.round(split),
    onPointerDown: (event) => {
      dragging.current = true;
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    onPointerMove: update,
    onPointerUp: (event) => {
      dragging.current = false;
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    },
    onPointerCancel: () => {
      dragging.current = false;
    },
    onKeyDown: (event) => {
      if (event.key === "ArrowLeft") {
        setSplit((value) => Math.max(minSplit, value - 2));
      }
      if (event.key === "ArrowRight") {
        setSplit((value) => Math.min(maxSplit, value + 2));
      }
    },
  };

  return { containerRef, split, narrow, dividerProps };
}

export function useSidebarResize({
  width,
  onWidthChange,
  minWidth = 160,
  maxWidth = 360,
  breakpoint = 680,
} = {}) {
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const update = (event) => {
    if (
      !dragging.current ||
      !containerRef.current ||
      window.innerWidth <= breakpoint
    ) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const nextWidth = event.clientX - rect.left;
    onWidthChange(Math.max(minWidth, Math.min(maxWidth, nextWidth)));
  };

  const dividerProps = {
    role: "separator",
    tabIndex: 0,
    "aria-label": "Resize file list",
    "aria-valuemin": minWidth,
    "aria-valuemax": maxWidth,
    "aria-valuenow": Math.round(width),
    onPointerDown: (event) => {
      dragging.current = true;
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    onPointerMove: update,
    onPointerUp: (event) => {
      dragging.current = false;
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    },
    onPointerCancel: () => {
      dragging.current = false;
    },
    onKeyDown: (event) => {
      if (event.key === "ArrowLeft") {
        onWidthChange(Math.max(minWidth, width - 8));
      }
      if (event.key === "ArrowRight") {
        onWidthChange(Math.min(maxWidth, width + 8));
      }
    },
  };

  return { containerRef, dividerProps };
}
