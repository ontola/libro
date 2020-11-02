import { Editor, Node, Point, Text } from 'slate';

export const isSelectionPointValid = (editor: Editor, point: Point): boolean => {
  try {
    const node = Node.get(editor, point.path);
    if (Text.isText(node) && node.text.length < point.offset) {
      return false;
    }
  } catch {
    return  false;
  }
  return true;
};
