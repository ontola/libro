import { ExitBreakPluginOptions, ExitBreakPlugin as exitBreakPluginBase } from '@udecode/slate-plugins';

import { CommandPlugin } from '../types';

export const exitBreakPlugin = (options?: ExitBreakPluginOptions): CommandPlugin => ({
  ...exitBreakPluginBase(options),
  commands: {},
});
