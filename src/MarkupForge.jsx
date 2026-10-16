import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MarkupPreview from "./MarkupPreview";
import FileSidebar from "./FileSidebar";
import WorkspaceHeader from "./WorkspaceHeader";
import MonacoSurface from "./MonacoSurface";
import ResizablePanels from "./ResizablePanels";
import useWorkspace from "./hooks/useWorkspace";
import useDocumentPictureInPicture from "./hooks/useDocumentPictureInPicture";
import { useSidebarResize } from "./hooks/useResizable";
import { samples, languageOptions, getLanguageOption } from "./lib/languages";
import { themeOptions, currentTheme, normalizeTheme } from "./lib/themes";
import { getHighlighter, calloutExtension } from "./lib/highlighter";
import "./MarkupForge.css";

export default function MarkupForge() {
  const {
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
    openNewFile,
    closeNewFile,
    updateCode,
    selectFile,
    setTheme,
    addFile,
    deleteFile,
    setSidebarWidth,
  } = useWorkspace({ languageOptions, samples, normalizeTheme });
  const { pipRoot, canDetach, detach, reattach } = useDocumentPictureInPicture({
    title: activeFile.name,
  });
  const { containerRef: bodyRef, dividerProps: sidebarDividerProps } =
    useSidebarResize({
      width: workspace.sidebarWidth,
      onWidthChange: setSidebarWidth,
    });
  const [mounted, setMounted] = useState(false);
  const definition = currentTheme(themeId);
  const languageOption = getLanguageOption(language);

  useEffect(() => {
    setMounted(true);
  }, []);

  const left = (
    <div className="editor-content">
      <MonacoSurface
        language={language}
        value={code}
        onChange={updateCode}
        themeName={definition.monacoTheme}
        onReady={() => setMounted(true)}
      />
    </div>
  );
  const inPagePreview = <MarkupPreview source={code} active={language === "markdown"} themeId={themeId} definition={definition} getHighlighter={getHighlighter} calloutExtension={calloutExtension} detached={Boolean(pipRoot)} onDetach={canDetach ? detach : undefined} />;
  return (
    <>
      <main className="app-shell" data-theme={themeId} style={definition.vars}>
        <div className="workspace" ref={bodyRef}>
          <FileSidebar
            files={workspace.files}
            activeFileId={activeFile.id}
            sidebarWidth={workspace.sidebarWidth}
            languageOptions={languageOptions}
            newFile={{
              open: newFileOpen,
              name: newFileName,
              language: newFileLanguage,
              onSubmit: addFile,
              onCancel: closeNewFile,
              onNameChange: setNewFileName,
              onLanguageChange: setNewFileLanguage,
            }}
            onSelectFile={selectFile}
            onDeleteFile={deleteFile}
            onOpenNewFile={openNewFile}
          />

          <div className="sidebar-divider" {...sidebarDividerProps} />

          <section className="workspace-main">
            <WorkspaceHeader
              activeFile={activeFile}
              language={language}
              languageOption={languageOption}
              themeId={themeId}
              themeOptions={themeOptions}
              onThemeChange={setTheme}
            />

            <ResizablePanels left={left} right={inPagePreview} />

            <footer className="statusbar">
              <span>{mounted ? "Ready" : "Loading"}</span>
              <span>{code.split("\n").length} lines</span>
              <span>UTF-8</span>
            </footer>
          </section>
        </div>
      </main>

      {pipRoot
        ? createPortal(
            <MarkupPreview
              source={code}
              active={language === "markdown"}
              themeId={themeId}
              definition={definition}
              getHighlighter={getHighlighter}
              calloutExtension={calloutExtension}
              pip
              onReattach={reattach}
            />,
            pipRoot,
          )
        : null}
    </>
  );
}

