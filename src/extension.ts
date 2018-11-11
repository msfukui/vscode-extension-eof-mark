'use strict';

import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('"eof-mark" is activated.');

  const EofMarkDecorationType = vscode.window.createTextEditorDecorationType({
    after: {
      contentText: "[EOF]",
      color: "gray"
    }
  });

  let activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    updateDecorations();
  }

  vscode.window.onDidChangeActiveTextEditor(
    editor => {
      activeEditor = editor;
      if (editor) {
        updateDecorations();
      }
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeTextDocument(
    event => {
      if (activeEditor && event.document === activeEditor.document) {
        updateDecorations();
      }
    },
    null,
    context.subscriptions
  );

  function updateDecorations() {
    if (!activeEditor) {
      return;
    }
    const text = activeEditor.document.getText();
    const Eof: vscode.DecorationOptions[] = [];

    const startPos = activeEditor.document.positionAt(text.length - 1);
    const endPos = activeEditor.document.positionAt(text.length);
    const decoration = {
      range: new vscode.Range(startPos, endPos),
      hoverMessage: "End of file."
    };
    Eof.push(decoration);

    activeEditor.setDecorations(EofMarkDecorationType, Eof);
  }
}
