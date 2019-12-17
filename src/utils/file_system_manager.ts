import { WriteFileOptions, writeFileSync, existsSync, readFile, readFileSync } from "fs";
import * as path from 'path';
import { Utils } from './utils';
import * as shell from "shelljs";

export class FileSystemManager {
    public static createFile(pathValue: string, fileName: string, data: string, options?: WriteFileOptions) {
        let filePath = path.join(pathValue, fileName);
        writeFileSync(filePath, data, options);
        Utils.openFile(filePath);
    }

    public static createFolder(pathValue: string): boolean {
        if (!existsSync(pathValue)) {
            try {
                shell.mkdir('-p', pathValue);

            } catch (error) {
                console.error(`Unable to create folder: ${error}`);
                return false;
            }
        }
        return true;
    }

    public static doesFileExist(filePath: string, fileName: string): boolean {
        return existsSync(path.join(filePath, fileName));
    }

    public static readFileAsString(filePath: string, fileName: string): string | undefined {
        if (!this.doesFileExist(filePath, fileName)) { return undefined; }
        let fileBuffer = readFileSync(path.join(filePath, fileName));
        let fileData = fileBuffer.toString();
        return fileData;
    }
}