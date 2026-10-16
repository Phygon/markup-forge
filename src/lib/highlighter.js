import { createHighlighter, defineLanguage } from "@tanstack/highlight/core";
import { createTanStackMarkdownHighlighter } from "@tanstack/highlight/markdown";
import {
  cpp,
  diff,
  js,
  shell,
  tsx,
  jsx,
  plaintext,
  toml,
  json,
  scheme,
  python,
  markdown,
  mermaid,
  ts,
  yaml,
} from "@tanstack/highlight/languages";
import { createThemeCss } from "@tanstack/highlight/theme";
import { solarizedDarkTheme } from "@tanstack/highlight/themes/solarized-dark";
import { createThemeTokenCss } from "./themes";

let highlighterPromise;

function createLogLanguage() {
  return defineLanguage({
    name: "log",
    aliases: ["logs"],
    tokenize(code) {
      const ranges = [];
      const overlaps = (start, end) =>
        ranges.some((range) => start < range.end && end > range.start);
      const addMatches = (pattern, className, groupIndex = 0) => {
        for (const match of code.matchAll(pattern)) {
          const text = match[groupIndex] || "";
          const offset =
            (match.index || 0) + (groupIndex ? match[0].indexOf(text) : 0);
          const start = offset;
          const end = start + text.length;
          if (text && !overlaps(start, end)) {
            ranges.push({ start, end, className });
          }
        }
      };
      addMatches(
        /(^|[^\w.])([a-z][\w.]*?(?:Error|Exception):[^\n]*(?:\n[ \t]+(?:at|Caused by:|\.\.\.).*)*)/gim,
        "error",
        2,
      );
      addMatches(/"[^"]*"|'[^']*'/g, "string");
      addMatches(
        /\b(?:ALERT|CRIT|CRITICAL|EMERG|EMERGENCY|ERR|ERROR|FAILURE|FATAL|SEVERE)\b/gi,
        "error",
      );
      addMatches(/\b(?:WARN|WARNING|WRN)\b/gi, "warning");
      addMatches(/\b(?:DISPLAY|INF|INFO|NOTICE|STATUS)\b/gi, "info");
      addMatches(/\b(?:DBG|DEBUG|FINE)\b/gi, "debug");
      addMatches(/\b(?:FINER|FINEST|TRACE|TRC|VERBOSE|VRB)\b/gi, "trace");
      addMatches(
        /\b(?:ALERT|CRIT|CRITICAL|EMERG|EMERGENCY|ERR|ERROR|FAILURE|FATAL|SEVERE|WARN|WARNING|WRN|DISPLAY|INF|INFO|NOTICE|STATUS|DBG|DEBUG|FINE|FINER|FINEST|TRACE|TRC|VERBOSE|VRB)\b\s+([a-z_][\w./-]*(?:[ .]+[a-z_][\w./-]*)*):(?=\s)/gi,
        "property",
        1,
      );
      addMatches(
        /(^|(?:\]))[ \t]*([a-z_][\w./-]*(?:[ .]+[a-z_][\w./-]*)*):(?=\s)/gim,
        "property",
        2,
      );
      addMatches(/(?:file|ftp|https?):\/\/[^\s]+/gi, "url");
      addMatches(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, "constant");
      addMatches(
        /\b\d{4}[-/]\d{2}[-/]\d{2}(?:T\d{1,2}:\d{2}(?::\d{2}(?:[.,:]\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?\b/gi,
        "number",
      );
      addMatches(
        /\b\d{1,2}:\d{1,2}:\d{1,2}(?:[.,:]\d+)?(?:\s?[+-]\d{2}:?\d{2}|Z)?\b/g,
        "number",
      );
      addMatches(/\b(?:false|null|true)\b/gi, "keyword");
      addMatches(
        /\b(?:0x[a-f0-9]+|0b[01]+|v?\d[\da-f]*(?:\.\d+)?(?:e[+-]?\d+)?[a-z]{0,3})\b/gi,
        "number",
      );
      addMatches(/[;:?<=>~\/@!$%&+|^(){}*#-]/g, "operator");
      addMatches(/[\[\].,]/g, "punctuation");
      return ranges;
    },
  });
}

export function getHighlighter() {
  if (!highlighterPromise) {
    const languages = [
      cpp,
      diff,
      js,
      shell,
      tsx,
      jsx,
      plaintext,
      toml,
      json,
      scheme,
      python,
      markdown,
      mermaid,
      ts,
      yaml,
      createLogLanguage(),
    ];
    const highlighter = createHighlighter({ languages });
    const renderer = createTanStackMarkdownHighlighter(
      highlighter,
    );
    const themeCss = createThemeCss({
      light: solarizedDarkTheme,
      dark: solarizedDarkTheme,
      lightSelector: ".markdown-renderer[data-theme=\"solarized-light\"]",
      darkSelector: ".markdown-renderer[data-theme=\"solarized-dark\"]",
      codeBlockSelector: ".markdown-renderer pre.th-code, .markdown-renderer pre.tm-code",
      lineNumbersSelector:
        ".markdown-renderer .th-code--line-numbers, .markdown-renderer .tm-code--line-numbers",
    });
    highlighterPromise = Promise.resolve({
      renderer,
      themeCss: `${themeCss}\n${createThemeTokenCss()}`,
    });
  }
  return highlighterPromise;
}

export const calloutExtension = {
  name: "markup-forge-callouts",
  parseBlock(context) {
    const alert = context.lines[context.index]?.match(
      /^ {0,3}>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/i,
    );
    if (!alert) return undefined;
    const lines = [];
    let end = context.index + 1;
    while (end < context.lines.length) {
      const line = context.lines[end].match(/^ {0,3}>\s?(.*)$/);
      if (!line) break;
      lines.push(line[1]);
      end += 1;
    }
    context.consume(end - context.index);
    const name = alert[1].toLowerCase();
    return {
      type: "callout",
      kind: name === "caution" ? "danger" : name,
      title: alert[1][0] + alert[1].toLowerCase(),
      children: context.parseBlocks(lines.join("\n")),
    };
  },
  renderHtml(node, context) {
    if (node.type !== "callout") return undefined;
    const body = node.children
      .map((child) => context.renderBlock(child))
      .join("\n");
    return `<aside class="md-callout md-callout-${node.kind}"><div class="md-callout-title">${node.title}</div><div class="md-callout-body">${body}</div></aside>`;
  },
};
