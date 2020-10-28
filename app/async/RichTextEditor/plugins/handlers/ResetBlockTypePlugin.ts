import { ResetBlockTypePlugin as ResetBlockTypePluginBase, ResetBlockTypePluginOptions } from '@udecode/slate-plugins';

import { CommandPlugin } from '../types';

export const ResetBlockTypePlugin = (options: ResetBlockTypePluginOptions): CommandPlugin => ({
  ...ResetBlockTypePluginBase(options),
  commands: {},
});
