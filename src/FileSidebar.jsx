import React from "react";
import NewFileForm from "./NewFileForm";

export default function FileSidebar({
  files,
  activeFileId,
  sidebarWidth,
  languageOptions,
  newFile,
  onSelectFile,
  onDeleteFile,
  onOpenNewFile,
}) {
  const getLanguageOption = (id) =>
    languageOptions.find((option) => option.id === id);

  return (
    <aside
      className="file-sidebar"
      style={{
        flexBasis:
          typeof window !== "undefined" && window.innerWidth <= 680
            ? 0
            : sidebarWidth,
      }}
    >
      <div className="sidebar-head">
        <span>Files</span>
        <span className="file-count">{files.length}</span>
      </div>

      <div className="file-list">
        {files.map((file) => (
          <div
            className={file.id === activeFileId ? "file-row active" : "file-row"}
            key={file.id}
          >
            <button
              className="file-select"
              type="button"
              onClick={() => onSelectFile(file.id)}
            >
              <span className="file-kind">
                {getLanguageOption(file.language)?.short ||
                  file.language.toUpperCase()}
              </span>
              <span className="file-name">{file.name}</span>
            </button>
            <button
              className="file-delete"
              type="button"
              aria-label={`Delete ${file.name}`}
              disabled={files.length <= 1}
              onClick={() => onDeleteFile(file.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {newFile.open ? (
        <NewFileForm
          name={newFile.name}
          language={newFile.language}
          languageOptions={languageOptions}
          onSubmit={newFile.onSubmit}
          onNameChange={newFile.onNameChange}
          onLanguageChange={newFile.onLanguageChange}
          onCancel={newFile.onCancel}
        />
      ) : (
        <button className="new-file" type="button" onClick={onOpenNewFile}>
          + New file
        </button>
      )}
    </aside>
  );
}
