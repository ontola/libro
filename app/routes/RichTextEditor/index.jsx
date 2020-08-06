import React from 'react';
import { useSlate } from 'slate-react';
import styled from 'styled-components';

import RichTextEditor from '../../containers/RichTextEditor';

const EditorFrame = styled.div`
  flex: 1;
  height: 100%;
  margin: 0 10px;
`;

const Title = styled.div`
  color: #888;
  display: table-cell;
  height: 50px;
  vertical-align: middle;
`;

const RTE = () => {
  const [value, setValue] = React.useState(localStorage.getItem('RTE'));
  const onChange = React.useCallback((newValue) => {
    localStorage.setItem('RTE', newValue);
    setValue(newValue);
  });

  const plugins = React.useMemo(() => ([
    {
      name: 'Heading',
      commands: [
        {
          name: 'FormatHeading3',
          disabled: true,
        }
      ],
    },
    {
      name: 'Save',
      disabled: false,
      commands: [{
        name: 'Save',
        button: (props) => {
          const editor = useSlate();
          return (
            <button
              onClick={e => {
                e.preventDefault();
                onSave(editor, editor.children);
              }}
              style={{ marginLeft: '9px' }}
              {...props}
            >
              Save
            </button>
          )
        },
      }],
    },
  ]), []);

  return (
    <EditorFrame>
      <Title>Slate with plugins</Title>
      <RichTextEditor
        placeholder="Typ hier uw tekst..."
        plugins={plugins}
        value={value}
        // onAutoSave={onSaveEditor1}
        onChange={onChange}
        style={{
          backgroundColor: '#fff',
          height: '80vh',
          overflowY: 'scroll',
          padding: '0px 10px',
        }}
        toolbarStyle={{
          backgroundColor: '#fff',
        }}
      />
    </EditorFrame>
  );
};

export default RTE;
