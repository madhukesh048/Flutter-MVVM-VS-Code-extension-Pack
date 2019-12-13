import * as _ from 'lodash';
import { Base } from './base';

export class View extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    let classPrefixList: string[] = this.className.split('View');
    let classPrefix: string | undefined;
    if (!_.isEmpty(classPrefixList)) { classPrefix = _.first(classPrefixList); }

    this._dartString = `library ${fileName};

import 'package:responsive_builder/responsive_builder.dart';
import 'package:flutter/material.dart';

part '${fileName}_mobile.dart';
part '${fileName}_tablet.dart';
part '${fileName}_desktop.dart';

class ${this.className} extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ScreenTypeLayout(
        mobile: _${classPrefix}Mobile(),
        desktop: _${classPrefix}Desktop(),
        tablet: _${classPrefix}Tablet(),
      ),
    );
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}