import * as _ from "lodash";
import { Base } from "./base";

export class ViewModel extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string) {

    super(fileName, suffix);

    this._dartString = `
class ${this.className} extends BaseViewModel {
  ${this.className}();
  
  // Add you business logic here
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}