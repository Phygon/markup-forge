import React, { useEffect, useRef, useState } from "react";
import * as markdownApi from "@tanstack/markdown";

const MERMAID_CDN_URL = "https://esm.sh/mermaid@11.12.1?bundle";
let mermaidPromise;
let mermaidCounter = 0;

function loadMermaid() {
  if (mermaidPromise) return mermaidPromise;
  mermaidPromise = import(/* @vite-ignore */ MERMAID_CDN_URL).then((module) => {
    const candidate = module.default || module.mermaid || module;
    if (!candidate || typeof candidate.initialize !== "function" || typeof candidate.render !== "function") {
      throw new Error("Mermaid CDN module does not expose the expected API.");
    }
    return candidate;
  });
  return mermaidPromise;
}

const KATEX_CDN_URL = "https://esm.sh/katex@0.16.22?bundle";
let katexPromise;

function loadKatex() {
  if (katexPromise) return katexPromise;
  katexPromise = import(/* @vite-ignore */ KATEX_CDN_URL).then((module) => {
    const candidate = module.default || module.katex || module;
    if (!candidate || typeof candidate.renderToString !== "function") {
      throw new Error("KaTeX CDN module does not expose the expected API.");
    }
    return candidate;
  });
  return katexPromise;
}

const KATEX_CSS_URL = "https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css";
const katexStylePromises = new WeakMap();

function loadKatexStyles(targetDocument) {
  if (!targetDocument) return Promise.reject(new Error("KaTeX styles require a document."));
  if (katexStylePromises.has(targetDocument)) return katexStylePromises.get(targetDocument);

  const promise = new Promise((resolve, reject) => {
    const existing = targetDocument.querySelector("link[data-markup-forge-katex]");
    if (existing) {
      if (existing.sheet) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("KaTeX CSS could not be loaded from the CDN.")), { once: true });
      return;
    }

    const link = targetDocument.createElement("link");
    link.rel = "stylesheet";
    link.href = KATEX_CSS_URL;
    link.dataset.markupForgeKatex = "true";
    link.addEventListener("load", () => resolve(), { once: true });
    link.addEventListener("error", () => reject(new Error("KaTeX CSS could not be loaded from the CDN.")), { once: true });
    targetDocument.head.appendChild(link);
  });

  katexStylePromises.set(targetDocument, promise);
  return promise;
}

function enhancePreview(root) {
  const ownerDocument = root.ownerDocument;
  root.querySelectorAll('input[type="checkbox"]').forEach((input) => { input.className = "task-checkbox"; input.disabled = true; input.closest("li")?.classList.add("task-item"); });
  root.querySelectorAll("li").forEach((item) => {
    if (item.querySelector('input[type="checkbox"]')) return;
    const match = item.textContent?.match(/^\s*\[([ xX])\]\s+/);
    if (!match) return;
    const walker = ownerDocument.createTreeWalker(item, ownerDocument.defaultView.NodeFilter.SHOW_TEXT);
    let remaining = match[0].length; let node = walker.nextNode();
    while (node && remaining > 0) { const count = Math.min((node.nodeValue || "").length, remaining); node.nodeValue = (node.nodeValue || "").slice(count); remaining -= count; node = walker.nextNode(); }
    const checkbox = ownerDocument.createElement("input"); checkbox.type = "checkbox"; checkbox.checked = match[1].toLowerCase() === "x"; checkbox.disabled = true; checkbox.className = "task-checkbox"; item.classList.add("task-item"); item.insertBefore(checkbox, item.firstChild);
  });
  root.querySelectorAll('pre.tm-code[data-lang="diff"]').forEach((block) => block.classList.add("diff-block"));
}

function renderMath(root, katex) {
  const ownerDocument = root.ownerDocument;
  const walker = ownerDocument.createTreeWalker(root, ownerDocument.defaultView.NodeFilter.SHOW_TEXT);
  const nodes = []; let node = walker.nextNode();
  while (node) { if (!node.parentElement?.closest("pre,code,.mermaid-diagram")) nodes.push(node); node = walker.nextNode(); }
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  nodes.forEach((textNode) => { const source = textNode.nodeValue || ""; let match; let last = 0; let found = false; const fragment = ownerDocument.createDocumentFragment(); pattern.lastIndex = 0; while ((match = pattern.exec(source))) { found = true; if (match.index > last) fragment.appendChild(ownerDocument.createTextNode(source.slice(last, match.index))); const span = ownerDocument.createElement("span"); span.className = match[1] ? "math-display" : "math-inline"; span.innerHTML = katex.renderToString((match[1] || match[2]).trim(), { displayMode: Boolean(match[1]), throwOnError: false, output: "htmlAndMathml" }); fragment.appendChild(span); last = pattern.lastIndex; } if (found) { if (last < source.length) fragment.appendChild(ownerDocument.createTextNode(source.slice(last))); textNode.parentNode?.replaceChild(fragment, textNode); } });
}

export default function MarkupPreview({ source, active, themeId, definition, getHighlighter, calloutExtension, detached = false, pip = false, onDetach, onReattach }) {
  const [html, setHtml] = useState("");
  const [status, setStatus] = useState(active ? "loading" : "inactive");
  const [diagramState, setDiagramState] = useState("idle");
  const previewRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    if (!active || detached) { setHtml(""); setStatus(detached ? "inactive" : "inactive"); return () => { cancelled = true; }; }
    setStatus("loading");
    Promise.all([getHighlighter(), Promise.resolve(markdownApi)]).then(([highlighter, markdown]) => {
      if (cancelled) return;
      const doc = previewRef.current?.ownerDocument || document;
      if (!doc.querySelector("style[data-markup-forge-highlight]")) { const style = doc.createElement("style"); style.dataset.markupForgeHighlight = "true"; style.textContent = highlighter.themeCss; doc.head.appendChild(style); }
      const tree = markdown.parseMarkdown(source, { extensions: [calloutExtension] });
      setHtml(markdown.renderHtml(tree, { extensions: [calloutExtension], highlighter: highlighter.renderer }));
      setStatus("ready");
    }).catch((error) => { console.error(error); if (!cancelled) setStatus("error"); });
    return () => { cancelled = true; };
  }, [source, active, detached, themeId, getHighlighter, calloutExtension]);

  useEffect(() => {
    if (!html || !active || detached || !previewRef.current) return undefined;
    const root = previewRef.current;
    enhancePreview(root);
    if (!root.textContent?.includes("$")) return undefined;
    let cancelled = false;
    Promise.all([loadKatexStyles(root.ownerDocument), loadKatex()]).then(([, katex]) => {
      if (!cancelled && previewRef.current === root) renderMath(root, katex);
    }).catch((error) => console.error(error));
    return () => { cancelled = true; };
  }, [html, active, detached]);

  useEffect(() => {
    let cancelled = false;
    if (!html || !active || detached || !previewRef.current) return () => { cancelled = true; };
    const blocks = [...previewRef.current.querySelectorAll('pre.tm-code[data-lang="mermaid"]')];
    if (!blocks.length) return () => { cancelled = true; };
    setDiagramState("loading");
    loadMermaid().then((mermaid) => {
      mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: themeId.includes("light") ? "default" : "dark", themeVariables: { primaryColor: definition.vars["--code-bg"], primaryTextColor: definition.vars["--heading"], primaryBorderColor: definition.vars["--accent"], lineColor: definition.vars["--muted"], secondaryColor: definition.vars["--panel-bg"], tertiaryColor: definition.vars["--editor-bg"] } });
      return Promise.all(blocks.map(async (block) => { try { const result = await mermaid.render(`markup-forge-mermaid-${++mermaidCounter}`, block.textContent || ""); const wrapper = previewRef.current.ownerDocument.createElement("div"); wrapper.className = "mermaid-diagram"; wrapper.innerHTML = result.svg; block.replaceWith(wrapper); return true; } catch (error) { console.error(error); return false; } }));
    }).then((results) => { if (!cancelled) setDiagramState(results.every(Boolean) ? "ready" : "error"); }).catch((error) => { console.error(error); if (!cancelled) setDiagramState("error"); });
    return () => { cancelled = true; };
  }, [html, active, detached, themeId, definition]);

  const label = detached ? "Detached" : status === "ready" ? (diagramState === "loading" ? "Rendering diagram" : diagramState === "error" ? "Diagram issue" : "Live") : status === "error" ? "Unavailable" : status === "inactive" ? "Markdown only" : "Rendering";
  return <section className="preview-content" data-theme={themeId} style={definition.vars} onClick={(event) => { if (!pip) return; const anchor = event.target.closest?.("a[href]"); if (!anchor) return; const href = anchor.getAttribute("href"); if (!href) return; event.preventDefault(); if (href.startsWith("#")) { const target = previewRef.current?.ownerDocument.getElementById(decodeURIComponent(href)); target?.scrollIntoView({ behavior: "smooth" }); } else window.open(new URL(href, window.location.href).href, "_blank", "noopener,noreferrer"); }}>
    <header className="preview-head"><span>Rendered Markdown</span><div className="preview-actions">{onDetach && !detached ? <button type="button" className="preview-button" onClick={onDetach}>Detach</button> : null}{onReattach && detached ? <button type="button" className="preview-button" onClick={onReattach}>Reattach</button> : null}<span className="preview-state">{label}</span></div></header>
    {detached ? <div className="preview-message"><strong>Preview detached</strong><button type="button" className="preview-button" onClick={onReattach}>Reattach preview</button></div> : active ? <div className="markdown-preview markdown-renderer" data-theme={themeId} ref={previewRef}>{status === "error" ? <div className="preview-message">The Markdown preview could not be loaded.</div> : html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <div className="preview-message">{status === "loading" ? "Loading preview..." : "Nothing to preview yet."}</div>}</div> : <div className="preview-message">Select <strong>Markdown</strong> to see a live preview here.</div>}
  </section>;
}
