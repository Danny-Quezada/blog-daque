import Editor from "@monaco-editor/react";
import React, { useState,useContext } from "react";
import ReactDOM from "react-dom";
import { MarkdownReact } from "../MarkdownReact";
import EditorCss from "./editor.module.css";
import { FormContext  } from "../context/FormContext";

export function EditorReact() {
  const { article,setArticle } = useContext(FormContext);
 
  
  function handleEditorChange(value, event) {
    console.log(value);
    setArticle({...article,"Value":value});
  }
  return (
    <div className={EditorCss.container}>
      <div className={EditorCss.editor}>
        <Editor
          defaultLanguage="markdown"
          theme="vs-dark"
          onChange={handleEditorChange}
          value={article.Value}
        />
      </div>
      <div className={EditorCss.styleMarkdown}>
        <MarkdownReact value={article.Value} />
      </div>
    </div>
  );
}
