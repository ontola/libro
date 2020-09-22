import { withTransforms } from '@udecode/slate-plugins';

import { CommandPlugin } from '../types';

export const TransformsPlugin: CommandPlugin = {
  extendEditor: withTransforms(),
};
