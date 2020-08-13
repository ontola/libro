import React, { useCallback, useMemo } from 'react';
import { styled } from '@material-ui/core/styles';
import RichTextEditorMd from '../../async/TextEditor/RichTextEditor/components/RichTextEditorMd';
import { DefaultPlugins } from '../../async/TextEditor/RichTextEditor/plugins';

const EditorFrame = styled('div')({
  height: '100%',
  margin: '0 10px',
});

const Title = styled('div')({
  color: '#888',
  display: 'table-cell',
  height: '50px',
  verticalAlign: 'middle',
});

const RTE = () => {
  const value = useMemo(() => (
    localStorage.getItem('RTE') || ''
  ), []);

  const onAutoSave = useCallback((editor, value) => {
    localStorage.setItem('RTE', value);
  }, []);

  return (
      <EditorFrame>
        <Title>
          Slate with plugins
        </Title>
        <RichTextEditorMd
          placeholder='Typ hier uw tekst...'
          plugins={DefaultPlugins}
          value={value} 
          onAutoSave={onAutoSave}
          style={{
            backgroundColor: '#fff',
            height: '80vh', 
            overflowY: 'scroll',
            padding: '0px 10px',
          }} 
        />
      </EditorFrame>
  );
}

export default RTE;
