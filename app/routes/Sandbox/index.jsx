import React from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  Slate,
  withReact,
} from 'slate-react';

import editor from '../../ontology/ontola/editor';

const CodeElement = (props) => (
  <pre {...props.attributes}>
    <code>{props.children}</code>
  </pre>
);

const DefaultElement = (props) => <p {...props.attributes}>{props.children}</p>;

const RichEditor = () => {
  // const [enabledMap, plugins] = useEditorPlugins();
  const textEditor = React.useMemo(() => withHistory(withReact(createEditor())), []);
  const [editorValue, setEditorValue] = React.useState([
    {
      children: [{ text: 'test', bold: true }],
      type: editor.elements.Bold,
    },
  ]);

  const renderLeaf = React.useCallback(
    ({ attributes, children, leaf }) => (
      <span
        {...attributes}
        style={{
          fontWeight: leaf.bold ? 'bold' : 'normal',
          fontStyle: leaf.italic ? 'italic' : 'normal',
        }}
      >
        {children}
      </span>
    ),
    []
  );

  const renderElement = (props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  };

  return (
    <React.Fragment>
      <Slate
        editor={textEditor}
        value={editorValue}
        onChange={(v) => setEditorValue(v)}
      >
        <Editable
          renderElement={React.useCallback(renderElement, [])}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </React.Fragment>
  );
};

export default RichEditor;
