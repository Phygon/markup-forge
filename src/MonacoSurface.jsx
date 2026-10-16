import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { monacoLanguage } from "./lib/languages";
import { defineMonacoThemes, defineCustomLanguages } from "./lib/monaco";

export default function MonacoSurface({
  language,
  value,
  onChange,
  themeName,
  onReady,
}) {
  const monacoRef = useRef(null);

  useEffect(() => {
    monacoRef.current?.editor.setTheme(themeName);
  }, [themeName]);

  function beforeMount(monaco) {
    defineMonacoThemes(monaco);
    defineCustomLanguages(monaco);
  }

  function handleMount(editor, monaco) {
    monacoRef.current = monaco;
    defineMonacoThemes(monaco);
    monaco.editor.setTheme(themeName);
    onReady?.();
  }

  return (
    <Editor
      height="100%"
      width="100%"
      language={monacoLanguage[language] || language}
      value={value}
      theme={themeName}
      beforeMount={beforeMount}
      onMount={handleMount}
      onChange={(next) => onChange(next || "")}
      options={{
        automaticLayout: true,
        contextmenu: false,
        minimap: { enabled: false },
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 14,
        lineHeight: 24,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        renderLineHighlight: "all",
        bracketPairColorization: { enabled: true },
        padding: { top: 18, bottom: 40 },
        smoothScrolling: true,
        tabSize: 2,
        wordWrap: "off",
      }}
    />
  );
}
