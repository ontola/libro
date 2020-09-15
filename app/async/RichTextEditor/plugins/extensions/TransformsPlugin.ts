import { withTransforms } from '@udecode/slate-plugins';

import { CommandPlugin } from '../types';

export const TransformsPlugin: CommandPlugin = {
  commands: {},
  extendEditor: withTransforms(),
};
