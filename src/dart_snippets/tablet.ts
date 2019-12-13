import * as _ from 'lodash';
import {Base} from './base';

export class Tablet extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    this._dartString = `import 'package:flutter/material.dart';
import '${_.snakeCase(this.className)}_model.dart';

class ${this.className} extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    ${this.className}Model viewModel = ${this.className}Model();
    return BaseView<${this.className}Model>(
      viewModel: viewModel,
      builder: (context, viewModel, _) => _getView(context, viewModel),
      onModelReady: (viewModel) {
        // Do something once the view model has loaded
      }
    );
  }

  /// Generate your view here. You can access your business components
  /// by accessing the [viewModel]
  Widget _getView(BuildContext context, ${this.className}Model viewModel) {
    return Container();
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}