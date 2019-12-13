import * as vscode from 'vscode';
import * as path from "path";
import * as _ from "lodash";
import * as fs from "fs";
import * as shell from "shelljs";
import { Utils } from './utils';
import { View } from './dart_snippets/view';

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
		"views",
		_.snakeCase(fileName)
	);
	console.log(`createFiles: pathValue: ${pathValue}`);

	if (!fs.existsSync(pathValue)) {
		try {
			shell.mkdir("-p", pathValue);
		} catch (error) {
			console.error(error);
		}
		console.log('done');
	}
	if (
		fs.existsSync(path.join(pathValue, _.snakeCase(fileName) + "_view.dart"))
	) {
		showError(`${fileName}_view.dart already exists`);
		return;
	}
	createViewFile(pathValue, fileName);
	if (
		fs.existsSync(path.join(pathValue, _.snakeCase(fileName) + "_view_model.dart"))
	) {
		showError(`${fileName}_view_model.dart already exists`);
		return;
	}
	// createViewModelFile(pathValue, fileName);
	if (
		fs.existsSync(path.join(pathValue, _.snakeCase(fileName) + "_mobile.dart"))
	) {
		showError(`${fileName}_view.dart already exists`);
		return;
	}
	// createViewFile(pathValue, fileName);
	if (
		fs.existsSync(path.join(pathValue, _.snakeCase(fileName) + "_desktop.dart"))
	) {
		showError(`${fileName}_view.dart already exists`);
		return;
	}
	// createViewFile(pathValue, fileName);
	if (
		fs.existsSync(path.join(pathValue, _.snakeCase(fileName) + "_tablet.dart"))
	) {
		showError(`${fileName}_view.dart already exists`);
		return;
	}
	// createViewFile(pathValue, fileName);
}

function createViewFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, _.snakeCase(fileName) + "_view.dart");
	fs.writeFileSync(filePath, new View(fileName, 'View').dartString);
	Utils.openFile(filePath);
}

function showError(message: string) {
	vscode.window.showErrorMessage(message);
}

export function deactivate() { }
