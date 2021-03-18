import { withTransforms } from '@udecode/slate-plugins';

import { CommandPlugin } from '../types';

export const transformsPlugin: CommandPlugin = {
  commands: {},
  extendEditor: withTransforms(),
};
