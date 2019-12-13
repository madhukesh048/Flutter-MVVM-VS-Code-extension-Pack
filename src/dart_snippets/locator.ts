import * as _ from 'lodash';
import { Base } from './base';

export class Locator extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    this._dartString = `import '../core/logger.dart';
import '../core/services/navigator_service.dart';
import 'package:get_it/get_it.dart';
import 'package:logger/logger.dart';

GetIt locator = GetIt.instance;

class LocatorInjector {
    static Logger _log = getLogger('LocatorInjector');

    static Future<void> setupLocator() async {
    _log.d('Initializing Navigator Service');
    locator.registerLazySingleton(() => NavigatorService());
    }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}