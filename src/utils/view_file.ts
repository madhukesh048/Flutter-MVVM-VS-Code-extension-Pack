import * as path from 'path';
import * as _ from 'lodash';
import { existsSync } from 'fs';
import { FileSystemManager } from './file_system_manager';
import { View } from '../dart_snippets/views/view';
import { ViewModel } from '../dart_snippets/views/view_model';
import { Mobile } from '../dart_snippets/views/mobile';
import { Desktop } from '../dart_snippets/views/desktop';
import { Tablet } from '../dart_snippets/views/tablet';

export class ViewFile {

    constructor(private rootPath: string, private fileName: string) {
        console.debug(`ViewFile(rootPath: ${rootPath}, fileName: ${fileName})`);
        let folderCreated = FileSystemManager.createFolder(this.pathValue);
        if (!folderCreated) { return; }
    }

    public createResponsiveViews() {
        this.createFiles(this.snakeCasedFileName + '_view.dart', new View(this.snakeCasedFileName, 'View').dartString);
        this.createMobile();
        this.createTablet();
        this.createDesktop();
        this.createWithViewModel();
    }
    
    public createDemoViews() {
        this.createFiles(this.snakeCasedFileName + '_view.dart', new View(this.snakeCasedFileName, 'View').dartString);
        this.createFiles(this.snakeCasedFileName + '_mobile.dart', new Mobile(this.snakeCasedFileName, 'Mobile').demoString);
        this.createFiles(this.snakeCasedFileName + '_desktop.dart', new Desktop(this.snakeCasedFileName, 'Desktop').demoString);
        this.createFiles(this.snakeCasedFileName + '_tablet.dart', new Tablet(this.snakeCasedFileName, 'Tablet').demoString);
        this.createFiles(this.snakeCasedFileName + '_view_model.dart', new ViewModel(this.snakeCasedFileName, 'ViewModel').demoString);
    }

    public createView() {

    }

    public createMobile() {
        this.createFiles(this.snakeCasedFileName + '_mobile.dart', new Mobile(this.snakeCasedFileName, 'Mobile').dartString);
    }

    public createDesktop() {
        this.createFiles(this.snakeCasedFileName + '_desktop.dart', new Desktop(this.snakeCasedFileName, 'Desktop').dartString);
    }

    public createTablet() {
        this.createFiles(this.snakeCasedFileName + '_tablet.dart', new Tablet(this.snakeCasedFileName, 'Tablet').dartString);
    }

    public createWithViewModel() {
        this.createFiles(this.snakeCasedFileName + '_view_model.dart', new ViewModel(this.snakeCasedFileName, 'ViewModel').dartString);
    }

    private get snakeCasedFileName(): string {
        let snakeCasedFileName = _.snakeCase(this.fileName);
        console.debug(`get snakeCasedFileName: ${snakeCasedFileName}`);
        return snakeCasedFileName;
    }

    private get pathValue(): string {
        return path.join(
            this.rootPath,
            'lib',
            'views',
            this.snakeCasedFileName,
        );
    }

    private createFiles(fileName: string, data: string) {
        if (existsSync(path.join(this.pathValue, this.snakeCasedFileName))) {
            console.warn(`${fileName} already exists`);
            return;
        }

        FileSystemManager.createFile(this.pathValue, fileName, data);
    }
}