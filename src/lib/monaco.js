import { themes } from "./themes";

function monacoTokenRules(tokens) {
  return [
    { token: "comment", foreground: tokens.comment },
    { token: "string", foreground: tokens.string },
    { token: "string.escape", foreground: tokens.string },
    { token: "regexp", foreground: tokens.string },
    { token: "regexp.escape", foreground: tokens.string },
    { token: "keyword", foreground: tokens.keyword },
    { token: "keyword.operator", foreground: tokens.operator },
    { token: "number", foreground: tokens.number },
    { token: "type", foreground: tokens.type },
    { token: "type.identifier", foreground: tokens.type },
    { token: "class", foreground: tokens.type },
    { token: "interface", foreground: tokens.type },
    { token: "namespace", foreground: tokens.type },
    { token: "enum", foreground: tokens.type },
    { token: "function", foreground: tokens.function },
    { token: "operator", foreground: tokens.operator },
    { token: "identifier", foreground: tokens.info },
    { token: "variable", foreground: tokens.variable },
    { token: "parameter", foreground: tokens.variable },
    { token: "property", foreground: tokens.property },
    { token: "constant", foreground: tokens.constant },
    { token: "delimiter", foreground: tokens.punctuation },
    { token: "delimiter.bracket", foreground: tokens.punctuation },
    { token: "tag", foreground: tokens.type },
    { token: "attribute.name", foreground: tokens.property },
    { token: "attribute.value", foreground: tokens.string },
    { token: "log-error", foreground: tokens.error, fontStyle: "bold" },
    { token: "log-warning", foreground: tokens.warning, fontStyle: "bold" },
    { token: "log-info", foreground: tokens.info },
    { token: "log-debug", foreground: tokens.debug },
    { token: "log-trace", foreground: tokens.trace },
  ];
}

export function defineMonacoThemes(monaco) {
  Object.entries(themes).forEach(([id, definition]) => {
    const dark = !id.includes("light");
    const c = definition.vars;
    monaco.editor.defineTheme(definition.monacoTheme, {
      base: dark ? "vs-dark" : "vs",
      inherit: true,
      rules: monacoTokenRules(definition.tokens),
      colors: {
        "editor.background": c["--editor-bg"],
        "editor.foreground": c["--text"],
        "editorLineNumber.foreground": c["--muted"],
        "editorLineNumber.activeForeground": c["--heading"],
        "editor.lineHighlightBackground": c["--panel-bg"],
        "editor.selectionBackground": c["--selection"],
        "editorCursor.foreground": c["--accent"],
        "editorIndentGuide.background": c["--panel-bg"],
        "editorGutter.background": c["--editor-bg"],
        "editorWidget.background": c["--panel-bg"],
        "editorWidget.border": c["--border"],
        "editorSuggestWidget.background": c["--panel-bg"],
        "editorSuggestWidget.border": c["--border"],
        "editorSuggestWidget.selectedBackground": c["--selection"],
        ...definition.monacoColors,
      },
    });
  });
}

let customLanguagesReady = false;
export function defineCustomLanguages(monaco) {
  if (customLanguagesReady) return;
  customLanguagesReady = true;
  monaco.languages.register({ id: "log", extensions: [".log"], aliases: ["Log"] });
  monaco.languages.setMonarchTokensProvider("log", {
    tokenizer: {
      root: [
        [/"[^"]*"|'[^']*'/, "string"],
        [/\b(?:ERROR|ERR|FATAL|SEVERE)\b/i, "log-error"],
        [/\b(?:WARN|WARNING|WRN)\b/i, "log-warning"],
        [/\b(?:INFO|NOTICE|STATUS)\b/i, "log-info"],
        [/\b(?:DEBUG|DBG)\b/i, "log-debug"],
        [/\b(?:TRACE|TRC|VERBOSE|VRB)\b/i, "log-trace"],
        [/\b\d{4}-\d{2}-\d{2}\b/, "number"],
        [/\b\d{1,2}:\d{2}:\d{2}\b/, "number"],
        [/[a-z_][\w.-]*(?=\s*:)/i, "property"],
        [/./, ""],
      ],
    },
  });
}
