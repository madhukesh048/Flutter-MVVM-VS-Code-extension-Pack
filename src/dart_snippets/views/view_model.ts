import * as _ from "lodash";
import { Base } from "../architecture/base";

export class ViewModel extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string, private projectName?: string) {

    super(fileName, suffix);
    let initialPath = this.projectName === undefined ? '../../' : `package:${this.projectName}/`;
    this._dartString = `import '${initialPath}core/base/base_view_model.dart';

class ${this.className} extends BaseViewModel {
  ${this.className}();
  
  // Add ViewModel specific code here
}`;
  }

  get dartString(): string {
    return this._dartString;
  }

  get demoString(): string {
    let initialPath = this.projectName === undefined ? '../../' : `package:${this.projectName}/`;
    return `import '${initialPath}core/base/base_view_model.dart';

class HomeViewModel extends BaseViewModel {
  int _counter;

  HomeViewModel({int counter = 0}) : this._counter = counter;

  int get counter => this._counter;
  set counter(int value) {
    this._counter = value;
    notifyListeners();
  }

  void increment() => this.counter += 1;
}`;
  }
}