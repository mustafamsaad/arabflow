"use client";

import type { ForwardedRef } from "react";
import "@mdxeditor/editor/style.css";
import {
  type MDXEditorMethods,
  type MDXEditorProps,
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  Separator,
  CreateLink,
  ListsToggle,
  BlockTypeSelect,
  CodeToggle,
  InsertCodeBlock,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  linkDialogPlugin,
  quotePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  markdownShortcutPlugin,
} from "@mdxeditor/editor";
import { useTheme } from "next-themes";

// ─── WHY two plugins for code blocks? ──────────────────────────────
// codeBlockPlugin  → handles the MARKDOWN AST (parsing ``` blocks)
// codeMirrorPlugin → provides the EDITOR UI (syntax highlighting, language picker)
//
// This is "separation of concerns" in a plugin architecture:
// One plugin owns the data model, the other owns the view.
// Without codeMirrorPlugin, MDXEditor knows code blocks EXIST
// but has no component to RENDER them — hence the error.

const Editor = ({
  editorRef,
  markdown,
  onChange,
  ...props
}: {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
  markdown: string;
} & MDXEditorProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <MDXEditor
      key={isDark ? "dark" : "light"}
      markdown={markdown}
      onChange={onChange}
      className={`markdown-editor light-border-2 rounded-1.5 overflow-hidden ${isDark ? "dark-theme dark-editor" : ""}`}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            ts: "TypeScript",
            jsx: "JSX",
            tsx: "TSX",
            css: "CSS",
            html: "HTML",
            json: "JSON",
            sql: "SQL",
            python: "Python",
            xml: "XML",
            markdown: "Markdown",
            "": "Plain Text",
          },
        }),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />

              <BlockTypeSelect />
              <Separator />

              <BoldItalicUnderlineToggles />
              <Separator />

              <CodeToggle />
              <InsertCodeBlock />
              <Separator />

              <ListsToggle />
              <Separator />

              <CreateLink />
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
};
export default Editor;
