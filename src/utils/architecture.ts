import * as path from 'path';
import * as _ from "lodash";
import { FileSystemManager } from './file_system_manager';
import { WriteFileOptions } from 'fs';
import { BaseModel } from '../dart_snippets/architecture/base_model';
import { BaseService } from '../dart_snippets/architecture/base_service';
import { BaseViewModel } from '../dart_snippets/architecture/base_view_model';
import { Utils } from './utils';
import { NavigatorService } from '../dart_snippets/architecture/navigator_service';
import { Locator } from '../dart_snippets/architecture/locator';
import { Logger } from '../dart_snippets/architecture/logger';
import { Providers } from '../dart_snippets/architecture/providers';
import { Main } from '../dart_snippets/architecture/main';
import { YamlHelper } from './yaml_helper';

export class Architecture {

    constructor(private rootPath: string) { }

    public init() {
        this.initCore();
        this.initTheme();
        this.initViews();
        this.initWidgets();

        YamlHelper.initializeWithDependencies();
        this.createExistingFile(this.rootPath, 'main.dart', new Main('main.dart').dartString);
    }

    private initCore() {
        let corePath = path.join(this.rootPath, 'core');
        this.initBase(corePath);
        this.initServices(corePath);
        this.initModels(corePath);

        this.createFile(corePath, 'locator.dart', new Locator('locator.dart').dartString);
        this.createFile(corePath, 'logger.dart', new Logger('logger.dart').dartString);
        this.createFile(corePath, 'providers.dart', new Providers('providers.dart').dartString);
    }

    private initBase(corePath: string) {
        let basePath = path.join(corePath, 'base');

        let folderCreated = FileSystemManager.createFolder(basePath);
        if (!folderCreated) { return; }

        this.createFile(basePath, 'base_model.dart', new BaseModel('base_model.dart').dartString);
        this.createFile(basePath, 'base_service.dart', new BaseService('base_service.dart').dartString);
        this.createFile(basePath, 'base_view_model.dart', new BaseViewModel('base_view_model.dart').dartString);
    }

    private initServices(corePath: string) {
        let servicesPath = path.join(corePath, 'services');

        let folderCreated = FileSystemManager.createFolder(servicesPath);
        if (!folderCreated) { return; }

        this.createFile(servicesPath, 'navigator_service.dart', new NavigatorService('navigator_service.dart').dartString);
    }

    private initModels(corePath: string) {
        let modelsPath = path.join(corePath, 'models');
        let folderCreated = FileSystemManager.createFolder(modelsPath);
        console.debug(`FolderCreated: ${folderCreated}`);
    }

    private initTheme() {
        let themePath = path.join(this.rootPath, 'theme');
        let folderCreated = FileSystemManager.createFolder(themePath);
        console.debug(`FolderCreated: ${folderCreated}`);
    }

    private initViews() {
        let viewsPath = path.join(this.rootPath, 'views');
        let folderCreated = FileSystemManager.createFolder(viewsPath);
        console.debug(`FolderCreated: ${folderCreated}`);
    }

    private initWidgets() {
        let widgetsPath = path.join(this.rootPath, 'widgets');
        let folderCreated = FileSystemManager.createFolder(widgetsPath);
        console.debug(`FolderCreated: ${folderCreated}`);
    }

    private createFile(pathValue: string, fileName: string, data: string, options?: WriteFileOptions) {
        if (FileSystemManager.doesFileExist(pathValue, fileName)) {
            console.error(`${fileName} already exists`);
            return;
        }

        FileSystemManager.createFile(pathValue, fileName, data);
        Utils.openFile(path.join(pathValue, fileName));
    }

    private createExistingFile(pathValue: string, fileName: string, data: string, options?: WriteFileOptions) {
        FileSystemManager.createFile(pathValue, fileName, data);
        Utils.openFile(path.join(pathValue, fileName));
    }
}