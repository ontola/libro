import { SoftBreakPlugin as SoftBreakPluginBase, SoftBreakPluginOptions } from '@udecode/slate-plugins';
import { CommandPlugin } from '../types';

export const SoftBreakPlugin = (options?: SoftBreakPluginOptions): CommandPlugin => {
  return {
    ...SoftBreakPluginBase(options),
  };
};
