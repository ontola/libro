import { ExitBreakPlugin as ExitBreakPluginBase, ExitBreakPluginOptions } from '@udecode/slate-plugins';

import { CommandPlugin } from '../types';

export const ExitBreakPlugin = (options?: ExitBreakPluginOptions): CommandPlugin => ({
  ...ExitBreakPluginBase(options),
  commands: {},
});
