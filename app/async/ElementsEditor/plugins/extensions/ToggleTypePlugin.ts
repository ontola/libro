import { ToggleNodeTypeOptions, toggleNodeType } from '@udecode/plate-common';

import { CommandPlugin } from '../types';

export const toggleTypePlugin = (options: ToggleNodeTypeOptions): CommandPlugin => ({
  commands: {},
  extendEditor: (editor) => {
    toggleNodeType(editor, options);

    return editor;
  },
});
