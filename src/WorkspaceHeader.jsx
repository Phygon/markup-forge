import React from "react";

export default function WorkspaceHeader({
  activeFile,
  language,
  languageOption,
  themeId,
  themeOptions,
  onThemeChange,
}) {
  return (
    <header className="workspace-head">
      <span className="file-tab">
        <span className="file-icon">
          {languageOption?.short || language.toUpperCase()}
        </span>
        {activeFile.name}
      </span>
      <div className="toolbar">
        <span className="language-label">
          {languageOption?.label || language}
        </span>
        <select
          className="theme-select"
          aria-label="Theme"
          value={themeId}
          onChange={onThemeChange}
        >
          {themeOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
