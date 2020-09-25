import { withTrailingNode, WithTrailingNode } from '@udecode/slate-plugins';
import { Editor } from 'slate';

import { CommandPlugin } from '../types';

export const TrailingNodePlugin = (options?: WithTrailingNode): CommandPlugin => ({
  extendEditor: withTrailingNode(options) as <T extends Editor>(editor: T) => T,
});
