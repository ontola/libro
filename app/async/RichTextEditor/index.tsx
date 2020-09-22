import { makeStyles } from '@material-ui/styles';
import React from 'react';

import RichTextEditorMd from './components/RichTextEditorMd';
import { defaultPlugins } from './plugins';

const useStyles = makeStyles((theme: any) => ({
  editor: {
    padding: '8px 11px',
  },
  wrapper: {
    backgroundColor: theme?.palette?.grey?.xxLight,
    border: `1px solid ${theme?.palette?.grey?.xLight}`,
    borderRadius: '5px',
    flex: 1,
    minHeight: '150px',
    position: 'relative',
  },
}));

interface RichTextEditorWrapperProps {
  onChange: (markdown: string) => void;
  placeholder: string;
  value: string;
}

const RichTextEditorWrapper = ({
  onChange,
  placeholder,
  value,
}: RichTextEditorWrapperProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <RichTextEditorMd
        className={classes.editor}
        placeholder={placeholder}
        plugins={defaultPlugins}
        value={value}
        onAutoSave={(_, markdown) => onChange(markdown)}
      />
    </div>
  );
};

export default RichTextEditorWrapper;
