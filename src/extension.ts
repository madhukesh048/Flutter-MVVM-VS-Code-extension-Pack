import * as vscode from 'vscode';
import * as path from "path";
import * as _ from "lodash";
import * as fs from "fs";
import * as shell from "shelljs";
import { Utils } from './utils';
import { View } from './dart_snippets/view';
import { ViewModel } from './dart_snippets/view_model';
import { Mobile } from './dart_snippets/mobile';
import { Desktop } from './dart_snippets/desktop';
import { Tablet } from './dart_snippets/tablet';
import { BaseModel } from './dart_snippets/base_model';
import { BaseViewModel } from './dart_snippets/base_view_model';
import { BaseService } from './dart_snippets/base_service';
import { NavigatorService } from './dart_snippets/navigator_service';
import { Locator } from './dart_snippets/locator';
import { Logger } from './dart_snippets/logger';
import { Providers } from './dart_snippets/providers';
import { Main } from './dart_snippets/main';
import { Architecture } from './initialize_architecture';

export function activate(context: vscode.ExtensionContext) {

	let initializeDisposable = vscode.commands.registerCommand('extension.initilizeArchitecture', async () => {
		vscode.window.showInformationMessage('Initializing Architecture Components');
		
		let rootPath = vscode.workspace.rootPath;
		if (_.isUndefined(rootPath)) { return; }
		new Architecture(path.join(rootPath, 'lib')).init();
	});

	let viewDisposable = vscode.commands.registerCommand('extension.createViews', async () => {
		let inputString = await getInputString();
		if (inputString.length === 0) {
			console.warn("activate: inputString length is 0");
			showError("Invalid name for file");
			return;
		}
		let fileName = Utils.processFileName(inputString);
		console.log(`activate: fileName: ${fileName}`);
		createFiles(fileName);
	});

	context.subscriptions.push(viewDisposable);
	context.subscriptions.push(initializeDisposable);
}


async function getInputString(): Promise<string> {
	let input = await vscode.window.showInputBox({ placeHolder: "Enter class name" });
	if (input === undefined) {
		return "";
	}
	return input;
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
	createViewModelFile(pathValue, fileName);
	if (
		fs.existsSync(path.join(pathValue, _.snakeCase(fileName) + "_mobile.dart"))
	) {
		showError(`${fileName}_view.dart already exists`);
		return;
	}
	createMobileFile(pathValue, fileName);
	if (
		fs.existsSync(path.join(pathValue, _.snakeCase(fileName) + "_desktop.dart"))
	) {
		showError(`${fileName}_view.dart already exists`);
		return;
	}
	createDesktopFile(pathValue, fileName);
	if (
		fs.existsSync(path.join(pathValue, _.snakeCase(fileName) + "_tablet.dart"))
	) {
		showError(`${fileName}_view.dart already exists`);
		return;
	}
	createTabletFile(pathValue, fileName);
}

function createBaseModelFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, 'base_model.dart');
	fs.writeFileSync(filePath, new BaseModel(fileName, 'BaseModel').dartString);
	Utils.openFile(filePath);
}
function createBaseServiceFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, 'base_service.dart');
	fs.writeFileSync(filePath, new BaseService(fileName, 'BaseServiceModel').dartString);
	Utils.openFile(filePath);
}
function createBaseViewModelFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, 'base_view_model.dart');
	fs.writeFileSync(filePath, new BaseViewModel(fileName, 'BaseViewModel').dartString);
	Utils.openFile(filePath);
}

function createNavigatorServiceFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, 'navigator_service.dart');
	fs.writeFileSync(filePath, new NavigatorService(fileName, 'NavigatorService').dartString);
	Utils.openFile(filePath);
}

function createLocatorFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, 'locator.dart');
	fs.writeFileSync(filePath, new Locator(fileName, 'Locator').dartString);
	Utils.openFile(filePath);
}

function createLoggerFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, 'logger.dart');
	fs.writeFileSync(filePath, new Logger(fileName, 'Logger').dartString);
	Utils.openFile(filePath);
}

function createProvidersFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, 'providers.dart');
	fs.writeFileSync(filePath, new Providers(fileName, 'Providers').dartString);
	Utils.openFile(filePath);
}

function createMainFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, 'main.dart');
	fs.writeFileSync(filePath, new Main(fileName, 'Main').dartString, { encoding: 'utf8', flag: 'w' });
	Utils.openFile(filePath);
}

function createViewFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, _.snakeCase(fileName) + "_view.dart");
	fs.writeFileSync(filePath, new View(fileName, 'View').dartString);
	Utils.openFile(filePath);
}
function createViewModelFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, _.snakeCase(fileName) + "_view_model.dart");
	fs.writeFileSync(filePath, new ViewModel(fileName, 'ViewModel').dartString);
	Utils.openFile(filePath);
}
function createMobileFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, _.snakeCase(fileName) + "_mobile.dart");
	fs.writeFileSync(filePath, new Mobile(fileName, 'Mobile').dartString);
	Utils.openFile(filePath);
}
function createDesktopFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, _.snakeCase(fileName) + "_desktop.dart");
	fs.writeFileSync(filePath, new Desktop(fileName, 'Desktop').dartString);
	Utils.openFile(filePath);
}
function createTabletFile(pathValue: string, fileName: string) {
	let filePath = path.join(pathValue, _.snakeCase(fileName) + "_tablet.dart");
	fs.writeFileSync(filePath, new Tablet(fileName, 'Tablet').dartString);
	Utils.openFile(filePath);
}

function showError(message: string) {
	vscode.window.showErrorMessage(message);
}

export function deactivate() { }
