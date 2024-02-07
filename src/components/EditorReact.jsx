import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { MarkdownReact } from "./MarkdownReact";

export function EditorReact() {
  const [value, setvalue] = useState("");
  const container = {
    width: "100%",
    height: "100%",
    display: "flex",
  };
  const styleMarkdown = {
    width: "50%",
    height: "100%",
    padding: "8px",
    overflow: "auto"
  };
  function handleEditorChange(value, event) {
    setvalue(value);
  }
  return (
    <div className="container" style={container}>
      <Editor
        className="editor"
        defaultLanguage="markdown"
        theme="vs-dark"
        height="100%"
        width="50%"
        onChange={handleEditorChange}
      />
      <div style={styleMarkdown}>
        <MarkdownReact value={value}/>
        </div>
    </div>
  );
}
