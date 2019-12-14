import * as vscode from 'vscode';
import * as path from "path";
import * as _ from "lodash";
import { Utils } from './utils';
import { Architecture } from './architecture';
import { ViewFile } from './view_file';

export function activate(context: vscode.ExtensionContext) {

	let initializeDisposable = vscode.commands.registerCommand('extension.initilizeArchitecture', async () => {
		vscode.window.showInformationMessage('Initializing Architecture Components');

		let rootPath = vscode.workspace.rootPath;
		if (_.isUndefined(rootPath)) { return; }
		new Architecture(path.join(rootPath, 'lib')).init();
	});

	let viewDisposable = vscode.commands.registerCommand('extension.createViews', async () => {
		let inputString = await getInputString();
		if (inputString.length === 0 || inputString.toLowerCase() === 'view') {
			console.warn("activate: inputString length is 0");
			showError("Invalid name for file");
			return;
		}

		let fileName = Utils.processFileName(inputString.trim());
		console.log(`activate: fileName: ${fileName}`);

		let rootPath = vscode.workspace.rootPath;
		if (rootPath === undefined) { return; }
		new ViewFile(rootPath, fileName).createResponsiveViews();
	});

	context.subscriptions.push(viewDisposable);
	context.subscriptions.push(initializeDisposable);
}

async function getInputString(): Promise<string> {
	let input = await vscode.window.showInputBox({
		placeHolder: "Enter class name",
		validateInput: async (value) => {
			if (value.toLowerCase() === 'view') {
				return 'View is not a valid class name';
			}
			return undefined;
		}
	});
	if (input === undefined) {
		return "";
	}
	return input;
}

function showError(message: string) {
	vscode.window.showErrorMessage(message);
}

export function deactivate() { }
