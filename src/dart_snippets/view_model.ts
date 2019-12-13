import * as _ from "lodash";
import { Base } from "./base";

export class ViewModel extends Base {
    private _dartString: string;

    constructor(fileName: string, suffix: string) {

        super(fileName, suffix);

        this._dartString = `import '../../core/base/base_view_model.dart';

class ${this.className} extends BaseViewModel {

  ${this.className}();
  
  // Add ViewModel specific code here
}`;
    }

    get dartString(): string {
        return this._dartString;
    }
}