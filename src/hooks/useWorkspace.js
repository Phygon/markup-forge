import { useEffect, useState } from "react";

const STORAGE_KEY = "markup-forge:v1";

function createWorkspace() {
  return {
    activeFileId: "file-untitled",
    sidebarWidth: 208,
    theme: "github-dark",
    files: [
      {
        id: "file-untitled",
        name: "untitled.md",
        language: "markdown",
        content: "",
      },
    ],
  };
}

function loadWorkspace(normalizeTheme) {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    if (!value || !Array.isArray(value.files) || !value.files.length) {
      return createWorkspace();
    }

    const files = value.files
      .filter(
        (file) =>
          file &&
          typeof file.id === "string" &&
          typeof file.name === "string" &&
          typeof file.language === "string" &&
          typeof file.content === "string",
      )
      .map((file) =>
        file.id === "file-notes-markdown" && file.name === "notes.md"
          ? { ...file, name: "untitled.md" }
          : file,
      );

    if (!files.length) return createWorkspace();

    return {
      activeFileId: files.some((file) => file.id === value.activeFileId)
        ? value.activeFileId
        : files[0].id,
      sidebarWidth: Math.min(
        360,
        Math.max(160, Number(value.sidebarWidth) || 208),
      ),
      theme: normalizeTheme(value.theme),
      files,
    };
  } catch {
    return createWorkspace();
  }
}

function saveWorkspace(workspace) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
  } catch {
    // Storage can be unavailable.
  }
}

export default function useWorkspace({ languageOptions, samples, normalizeTheme }) {
  const [workspace, setWorkspace] = useState(() =>
    typeof window === "undefined"
      ? createWorkspace()
      : loadWorkspace(normalizeTheme),
  );
  const [newFileOpen, setNewFileOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFileLanguage, setNewFileLanguage] = useState("markdown");

  const activeFile =
    workspace.files.find((file) => file.id === workspace.activeFileId) ||
    workspace.files[0];
  const themeId = normalizeTheme(workspace.theme);
  const language = activeFile.language;
  const code = activeFile.content;

  useEffect(() => {
    const timer = window.setTimeout(
      () => saveWorkspace({ ...workspace, theme: themeId }),
      250,
    );
    return () => window.clearTimeout(timer);
  }, [workspace, themeId]);

  const updateCode = (value) => {
    setWorkspace((current) => ({
      ...current,
      files: current.files.map((file) =>
        file.id === current.activeFileId
          ? { ...file, content: value }
          : file,
      ),
    }));
  };

  const selectFile = (id) => {
    setWorkspace((current) => ({ ...current, activeFileId: id }));
  };

  const setTheme = (eventOrId) => {
    const nextTheme =
      typeof eventOrId === "string" ? eventOrId : eventOrId.target.value;
    setWorkspace((current) => ({
      ...current,
      theme: normalizeTheme(nextTheme),
    }));
  };

  const addFile = (event) => {
    event.preventDefault();
    const option =
      languageOptions.find((item) => item.id === newFileLanguage) ||
      languageOptions[0];
    const base = newFileName.trim() || "untitled";
    const name = /\.[a-z0-9]+$/i.test(base)
      ? base
      : `${base}${option.extension}`;
    const file = {
      id: `file-${Date.now()}`,
      name,
      language: option.id,
      content: samples[option.id] || "",
    };

    setWorkspace((current) => ({
      ...current,
      activeFileId: file.id,
      files: [...current.files, file],
    }));
    setNewFileName("");
    setNewFileLanguage("markdown");
    setNewFileOpen(false);
  };

  const deleteFile = (id) => {
    setWorkspace((current) => {
      if (current.files.length <= 1) return current;
      const index = current.files.findIndex((file) => file.id === id);
      const files = current.files.filter((file) => file.id !== id);
      return {
        ...current,
        files,
        activeFileId:
          current.activeFileId === id
            ? files[Math.min(index, files.length - 1)].id
            : current.activeFileId,
      };
    });
  };

  const setSidebarWidth = (width) => {
    setWorkspace((current) => ({
      ...current,
      sidebarWidth: Math.max(160, Math.min(360, width)),
    }));
  };

  return {
    workspace,
    activeFile,
    themeId,
    language,
    code,
    newFileOpen,
    newFileName,
    newFileLanguage,
    setNewFileName,
    setNewFileLanguage,
    openNewFile: () => setNewFileOpen(true),
    closeNewFile: () => setNewFileOpen(false),
    updateCode,
    selectFile,
    setTheme,
    addFile,
    deleteFile,
    setSidebarWidth,
  };
}
