import * as vscode from 'vscode';
import * as path from "path";
import * as _ from "lodash";

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.createViews', async () => {
		let inputString = await getInputString();
		if (inputString.length === 0) {
			console.warn("activate: inputString length is 0");
			showError("Invalid name for file");
			return;
		}
		let fileName = processFileName(inputString);
		console.log(`activate: fileName: ${fileName}`);
		vscode.window.showInformationMessage(fileName);
		createFiles(fileName);
	});
	context.subscriptions.push(disposable);
}


async function getInputString(): Promise<string> {
	let input = await vscode.window.showInputBox({ placeHolder: "Enter class name" });
	if (input === undefined) {
		return "";
	}
	return input;
}


function processFileName(fileName: string): string {
	console.log(`processFilename: fileName:${fileName}`);
	if (fileName.length < 4) {
		return fileName;
	}
	let lastFileName = fileName
		.substring(fileName.length - 4, fileName.length)
		.toLowerCase();

	if (lastFileName === "view") {
		let truncatedFileName = fileName.substring(0, fileName.length - 4);
		return truncatedFileName;
	}

	return fileName;
}
function createFiles(fileName: string) {
	let rootPath = vscode.workspace.rootPath;
	if (rootPath === undefined) {
		return;
	}
	let pathValue = path.join(
		rootPath,
		"lib",
		"ui",
		"views",
		_.snakeCase(fileName)
	);
	console.log(`createFiles: pathValue: ${pathValue}`);
}

function showError(message: string) {
	vscode.window.showErrorMessage(message);
}

export function deactivate() { }
