import { someNode } from '@udecode/plate-common';

import { ElementsEditor } from '../editor';

export const isElementTypeActive = (type: string) => (editor: ElementsEditor): boolean =>
  !!editor.selection && someNode(editor, { match: { type } });
