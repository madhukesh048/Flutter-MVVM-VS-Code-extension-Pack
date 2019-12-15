import { window, InputBoxOptions } from 'vscode';

export class VsCodeActions {

    public static async getInputString(placeHolder?: string, validateInput?: InputBoxOptions["validateInput"]): Promise<string> {
        let input = await window.showInputBox({
            placeHolder: placeHolder,
            validateInput: validateInput,
        });
        if (input === undefined) {
            return "";
        }
        return input;
    }
}