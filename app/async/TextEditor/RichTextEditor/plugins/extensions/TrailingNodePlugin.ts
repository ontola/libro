import { withTrailingNode, WithTrailingNode } from '@udecode/slate-plugins';
import { Editor } from 'slate';
import { CommandPlugin } from '../types';

export const TrailingNodePlugin = (options?: WithTrailingNode): CommandPlugin => {
  return {
    // Should be called after withTransforms
    extendEditor: withTrailingNode(options) as <T extends Editor>(editor: T) => T,
  };
};
