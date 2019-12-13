import * as _ from 'lodash';
import { Base } from './base';

export class BaseViewModel extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    this._dartString = `import 'package:flutter/foundation.dart';
import 'package:logger/logger.dart';

import '../logger.dart';

class BaseViewModel extends ChangeNotifier {
    String _title;
    bool _busy;
    Logger log;
    bool _isDisposed = false;

    BaseViewModel({
    bool busy = false,
    String title,
    })  : _busy = busy,
        _title = title {
    log = getLogger(title ?? this.runtimeType.toString());
    }

    bool get busy => this._busy;
    bool get isDisposed => this._isDisposed;
    String get title => _title ?? this.runtimeType.toString();

    set busy(bool busy) {
    log.i(
        'busy: '
        '$title is entering '
        '\${busy ? 'busy' : 'free'} state',
    );
    this._busy = busy;
    notifyListeners();
    }

    @override
    void notifyListeners() {
    if (!isDisposed) {
        super.notifyListeners();
    } else {
        log.w('notifyListeners: Notify listeners called after '
            '\${title ?? this.runtimeType.toString()} has been disposed');
    }
    }

    @override
    void dispose() {
    log.i('dispose');
    _isDisposed = true;
    super.dispose();
    }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}