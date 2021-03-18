import { ResetBlockTypePluginOptions, ResetBlockTypePlugin as resetBlockTypePluginBase } from '@udecode/slate-plugins';

import { CommandPlugin } from '../types';

export const resetBlockTypePlugin = (options: ResetBlockTypePluginOptions): CommandPlugin => ({
  ...resetBlockTypePluginBase(options),
  commands: {},
});
