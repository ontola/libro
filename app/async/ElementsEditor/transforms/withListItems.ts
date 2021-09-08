import {
  Editor,
  Node,
  NodeEntry,
  Text,
  Transforms,
} from 'slate';

export const withListItems = (editor: Editor): Editor => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]: NodeEntry) => {
    // If the element is a text node, and its parent a list item, wrap it in a paragraph.
    if (node.type === 'li') {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (Text.isText(child)) {
          Transforms.wrapNodes(
            editor,
            {
              children: [],
              type: 'p',
            },
            { at: childPath },
          );

          return;
        }
      }
    }

    // Fall back to the original `normalizeNode` to enforce other constraints.
    normalizeNode([node, path]);
  };

  return editor;
};
