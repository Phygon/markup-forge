import React from "react";
import { useResizableSplit } from "./hooks/useResizable";

export default function ResizablePanels({ left, right }) {
  const { containerRef, split, narrow, dividerProps } = useResizableSplit();

  return (
    <div
      className={narrow ? "editor-layout stacked" : "editor-layout"}
      ref={containerRef}
    >
      <div
        className="editor-pane"
        style={{ flex: narrow ? "0 0 440px" : `0 0 calc(${split}% - 4px)` }}
      >
        {left}
      </div>
      <div className="split-divider" {...dividerProps} />
      <div
        className="preview-pane"
        style={{ flex: narrow ? "0 0 440px" : "1 1 0" }}
      >
        {right}
      </div>
    </div>
  );
}
