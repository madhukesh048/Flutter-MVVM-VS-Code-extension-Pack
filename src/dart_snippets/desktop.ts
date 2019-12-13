import * as _ from 'lodash';
import {Base} from './base';

export class Desktop extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    this._dartString = `part of ${fileName}_view;

class _${this.className} extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('${fileName}_desktop'),
    );
  }
}`;
  }

  get dartString(): string {
    return this._dartString;
  }
}