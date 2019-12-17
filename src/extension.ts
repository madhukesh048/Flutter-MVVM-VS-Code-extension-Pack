import * as vscode from 'vscode';
import * as path from "path";
import * as _ from "lodash";
import { Utils } from './utils/utils';
import { Architecture } from './utils/architecture';
import { ViewFile } from './utils/view_file';
import { VsCodeActions } from './utils/vs_code_actions';
import { YamlHelper } from './utils/yaml_helper';

export function activate(context: vscode.ExtensionContext) {

	let initializeDisposable = vscode.commands.registerCommand('extension.initilizeArchitecture', async () => {
		vscode.window.showInformationMessage('Initializing Architecture Components');

		let rootPath = vscode.workspace.rootPath;
		if (_.isUndefined(rootPath)) { return; }
		let pubPath = vscode.workspace.rootPath;
		if (_.isUndefined(pubPath)) { return; }
		new Architecture(path.join(rootPath, 'lib'),pubPath).init();
		new ViewFile(rootPath, "home").createResponsiveViews();
	});

	let viewDisposable = vscode.commands.registerCommand('extension.createViews', async () => {

		let inputString = await VsCodeActions.getInputString('Enter class name', async (value) => {
			if (value.length === 0) {
				return 'Enter class name';
			}
			if (value.toLowerCase() === 'view') {
				return 'View is not a valid class name';
			}
			return undefined;
		});

		if (inputString.length === 0 || inputString.toLowerCase() === 'view') {
			console.warn("activate: inputString length is 0");
			showError("Invalid name for file");
			return;
		}

		let fileName = Utils.processFileName(inputString.trim());
		console.log(`activate: fileName: ${fileName}`);

		let rootPath = VsCodeActions.rootPath;
		if (rootPath === undefined) { return; }
		new ViewFile(rootPath, fileName).createResponsiveViews();
	});



	let widgetDisposable = vscode.commands.registerCommand('extension.createWidget', async () => {

		let inputString = await VsCodeActions.getInputString('Enter class name', async (value) => {
			if (value.length === 0) {
				return 'Enter class name';
			}
			if (value.toLowerCase() === 'widget') {
				return 'Widget is not a valid class name';
			}
			return undefined;
		});

		if (inputString.length === 0 || inputString.toLowerCase() === 'widget') {
			console.warn("activate: inputString length is 0");
			showError("Invalid name for file");
			return;
		}

		let fileName = Utils.processFileName(inputString.trim());
		console.log(`activate: fileName: ${fileName}`);

		let rootPath = VsCodeActions.rootPath;
		if (rootPath === undefined) { return; }
		new WidgetFile(rootPath, fileName).createResponsiveWidgets();
	});

	context.subscriptions.push(viewDisposable);
	context.subscriptions.push(initializeDisposable);
	context.subscriptions.push(widgetDisposable);
}

function showError(message: string) {
	vscode.window.showErrorMessage(message);
}

export function deactivate() { }
