import { ParagraphPluginOptions, ParagraphPlugin as paragraphPluginBase } from '@udecode/slate-plugins';

import { CommandPlugin } from '../types';

export const paragraphPlugin = (options?: ParagraphPluginOptions): CommandPlugin => ({
  ...paragraphPluginBase(options),
  commands: {},
});
