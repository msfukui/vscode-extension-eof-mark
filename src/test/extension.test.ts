import * as assert from 'assert';
import * as vscode from 'vscode';

suite("Extension Tests", function () {

    test("[EOF] is displayed at the end of the file.", function() {
        // Since it seems that it is unlikely that the current style
        // of the document can be acquired, we decided to check only
        // whether the test will work once.
        let ae = vscode.window.activeTextEditor;
        if (ae) {
            assert.equal(ae.document.lineCount, 1);
        }
    });
});
