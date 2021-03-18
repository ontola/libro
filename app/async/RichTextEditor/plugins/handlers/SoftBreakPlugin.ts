import { SoftBreakPluginOptions, SoftBreakPlugin as softBreakPluginBase } from '@udecode/slate-plugins';

import { CommandPlugin } from '../types';

export const softBreakPlugin = (options?: SoftBreakPluginOptions): CommandPlugin => ({
  ...softBreakPluginBase(options),
  commands: {},
});
