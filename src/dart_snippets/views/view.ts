import * as _ from 'lodash';
import { Base } from '../architecture/base';

export class View extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    let classPrefixList: string[] = this.className.split('View');
    let classPrefix: string | undefined;
    if (!_.isEmpty(classPrefixList)) { classPrefix = _.first(classPrefixList); }

    this._dartString = `library ${fileName}_view;

import 'package:provider_architecture/provider_architecture.dart';
import 'package:responsive_builder/responsive_builder.dart';
import 'package:flutter/material.dart';
import '${fileName}_view_model.dart';

part '${fileName}_mobile.dart';
part '${fileName}_tablet.dart';
part '${fileName}_desktop.dart';

class ${this.className} extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    ${classPrefix}ViewModel viewModel = ${classPrefix}ViewModel();
    return ViewModelProvider<${classPrefix}ViewModel>.withConsumer(
      viewModel: viewModel,
      onModelReady: (viewModel) {
        // Do something once your viewModel is initialized
      },
      builder: (context, viewModel, child) {
        return ScreenTypeLayout(
          mobile: _${classPrefix}Mobile(viewModel),
          desktop: _${classPrefix}Desktop(viewModel),
          tablet: _${classPrefix}Tablet(viewModel),  
        );
      }
    );
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}