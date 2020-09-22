import { ParagraphPlugin as ParagraphPluginBase, ParagraphPluginOptions } from '@udecode/slate-plugins';

import { CommandPlugin } from '../types';

export const ParagraphPlugin = (options?: ParagraphPluginOptions): CommandPlugin => ({
  ...ParagraphPluginBase(options),
});
