import * as _ from "lodash";
import { Base } from "../architecture/base";

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

    get demoString(): string {
        return `import '../../core/base/base_view_model.dart';

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