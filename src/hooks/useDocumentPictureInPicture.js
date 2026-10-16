import { useEffect, useRef, useState } from "react";

function cloneStyles(targetDocument) {
  document
    .querySelectorAll('style, link[rel="stylesheet"]')
    .forEach((node) => targetDocument.head.appendChild(node.cloneNode(true)));
}

export default function useDocumentPictureInPicture({ title } = {}) {
  const [pipRoot, setPipRoot] = useState(null);
  const pipWindowRef = useRef(null);
  const canDetach =
    typeof window !== "undefined" &&
    typeof window.documentPictureInPicture?.requestWindow === "function";

  useEffect(
    () => () => {
      if (pipWindowRef.current && !pipWindowRef.current.closed) {
        pipWindowRef.current.close();
      }
    },
    [],
  );

  const detach = async () => {
    if (!canDetach) return;

    try {
      const win = await window.documentPictureInPicture.requestWindow({
        width: 720,
        height: 860,
      });
      win.document.title = title ? `${title} - Preview` : "Preview";
      win.document.documentElement.style.height = "100%";
      win.document.body.style.height = "100%";
      win.document.body.style.margin = "0";
      win.document.body.style.overflow = "hidden";
      cloneStyles(win.document);

      const root = win.document.createElement("div");
      root.style.width = "100%";
      root.style.height = "100%";
      root.style.overflow = "hidden";
      win.document.body.appendChild(root);

      const close = () => {
        if (pipWindowRef.current === win) {
          pipWindowRef.current = null;
          setPipRoot(null);
        }
      };

      win.addEventListener("pagehide", close);
      pipWindowRef.current = win;
      setPipRoot(root);
    } catch (error) {
      console.error(error);
    }
  };

  const reattach = () => {
    const win = pipWindowRef.current;
    pipWindowRef.current = null;
    setPipRoot(null);
    if (win && !win.closed) win.close();
  };

  return { pipRoot, canDetach, detach, reattach };
}
