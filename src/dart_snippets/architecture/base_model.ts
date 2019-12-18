import * as _ from 'lodash';
import { Base } from './base';

export class BaseModel extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix?: string) {
    super(fileName, suffix);

    this._dartString = `import 'package:equatable/equatable.dart';

abstract class BaseModel implements Equatable {
  Map<String, Object> toMap();
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}