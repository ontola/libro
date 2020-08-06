import React from 'react';
import { ReactEditor } from 'slate-react';

import { RichTextEditor } from './RichTextEditor/components';
import { deserializeMarkdown, serializeMarkdown } from './RichTextEditor/markdown';

const initialValue = [
  {
    children: [
      {
        children: [{ text: '' }],
        type: 'p',
      },
    ],
  },
];

const deserialize = (markdown) => {
  if (markdown) {
    return [{ children: deserializeMarkdown(markdown) }];
  }

  return null;
};

const RichTextEditorComp = (props) => {
  const deserializedValue = React.useMemo(() => deserialize(props.value) || initialValue, [props.value]);
  const onChange = React.useCallback((editor, nodes) => {
    const markdown = serializeMarkdown(nodes);
    if (ReactEditor.isFocused(editor)) {
      props.onChange(markdown);
    }
  }, []);

  return (
    <RichTextEditor
      {...props}
      value={deserializedValue}
      onAutoSave={onChange}
      onChange={null}
    />
  );
};

export default RichTextEditorComp;
