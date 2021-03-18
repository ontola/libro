import { WithTrailingNode, withTrailingNode } from '@udecode/slate-plugins';
import { Editor } from 'slate';

import { CommandPlugin } from '../types';

export const trailingNodePlugin = (options?: WithTrailingNode): CommandPlugin => ({
  commands: {},
  extendEditor: withTrailingNode(options) as <T extends Editor>(editor: T) => T,
});
