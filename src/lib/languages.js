export const samples = {
  markdown: "",
  yaml: "project: markup-forge\nmode: reference-only\nlanguages:\n  - markdown\n  - typescript\nexecution: disabled",
  cpp: "#include <iostream>\n\nint main() {\n  std::cout << \"ready for review\\n\";\n  return 0;\n}",
  typescript: "type DocumentKind = \"markdown\" | \"typescript\";\n\nconst activeKind: DocumentKind = \"typescript\";\nconsole.log(activeKind);",
  shell: "#!/usr/bin/env bash\nset -euo pipefail\nprintf '%s\\n' \"ready for review\"",
  tsx: "import type { FC } from \"react\";\n\ntype StatusProps = { value: string };\n\nexport const Status: FC<StatusProps> = ({ value }) => (\n  <span>{value}</span>\n);",
  js: "const status = \"ready for review\";\nconsole.log(status);",
  jsx: "export function Status({ value }) {\n  return <span>{value}</span>;\n}",
  plaintext: "Reference text only.\nExecution is disabled.",
  log: "2026-10-12T09:41:12.482Z INFO service=markup-forge message=\"Workspace ready\"\n2026-10-12T09:41:13.017Z WARN cache=stale retry=2\n2026-10-12T09:41:13.291Z ERROR request failed: ConnectionException: upstream unavailable",
  toml: "project = \"markup-forge\"\nmode = \"reference-only\"\n\n[editor]\nexecution = false",
  json: "{\n  \"project\": \"markup-forge\",\n  \"execution\": false\n}",
  scheme: "(define (status-message value)\n  (display value)\n  (newline))\n\n(status-message \"ready\")",
  python: "status = \"ready for review\"\nprint(status)",
};

export const languageOptions = [
  { id: "cpp", label: "C++", short: "CPP", extension: ".cpp" },
  { id: "js", label: "JavaScript", short: "JS", extension: ".js" },
  { id: "json", label: "JSON", short: "JSON", extension: ".json" },
  { id: "jsx", label: "JSX", short: "JSX", extension: ".jsx" },
  { id: "log", label: "Log", short: "LOG", extension: ".log" },
  { id: "markdown", label: "Markdown", short: "MD", extension: ".md" },
  { id: "plaintext", label: "Plaintext", short: "TXT", extension: ".txt" },
  { id: "python", label: "Python", short: "PY", extension: ".py" },
  { id: "scheme", label: "Scheme", short: "SCM", extension: ".scm" },
  { id: "shell", label: "Shell", short: "SH", extension: ".sh" },
  { id: "toml", label: "TOML", short: "TOML", extension: ".toml" },
  { id: "tsx", label: "TSX", short: "TSX", extension: ".tsx" },
  { id: "typescript", label: "TypeScript", short: "TS", extension: ".ts" },
  { id: "yaml", label: "YAML", short: "YAML", extension: ".yaml" },
];

export function getLanguageOption(id) {
  return languageOptions.find((option) => option.id === id);
}

export const monacoLanguage = {
  typescript: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  markdown: "markdown",
  plaintext: "plaintext",
};
