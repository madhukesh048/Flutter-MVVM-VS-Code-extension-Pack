import * as _ from 'lodash';
import {Base} from '../architecture/base';

export class Desktop extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    let classPrefixList: string[] = this.className.split('Desktop');
    let classPrefix: string | undefined;
    if (!_.isEmpty(classPrefixList)) { classPrefix = _.first(classPrefixList); }

    this._dartString = `part of ${fileName}_view;

class _${this.className} extends StatelessWidget {
  final ${classPrefix}ViewModel viewModel;

  _${this.className}(this.viewModel);

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