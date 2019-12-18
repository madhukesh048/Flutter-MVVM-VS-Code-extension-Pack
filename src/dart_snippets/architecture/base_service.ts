import * as _ from 'lodash';
import { Base } from './base';

export class BaseService extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `import 'package:logger/logger.dart';

import '../logger.dart';

class BaseService {
  Logger log;

  BaseService({String title}) {
    this.log = getLogger(
      title ?? this.runtimeType.toString(),
    );
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}