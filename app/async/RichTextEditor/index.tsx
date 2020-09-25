import { makeStyles } from '@material-ui/styles';
import React from 'react';

import RichTextEditorMd from './components/RichTextEditorMd';
import { defaultPluginsOptions, getDefaultPlugins } from './plugins';

const useStyles = makeStyles((theme: any) => ({
  slateEditor: {
    padding: '8px 11px',
  },
  slateItalic: {
    fontStyle: 'italic',
  },
  slateOrderedList: {
    listStyleType: 'decimal',
  },
  slateToolbar: {
    margin: '0px',
    padding: '0px',
  },
  slateUnorderedList: {
    '& ul': {
      '& ul': {
        listStyleType: 'square',
      },
      'listStyleType': 'circle',
    },
    'listStyleType': 'disc',
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

const RichTextEditorWrapper: React.FC<RichTextEditorWrapperProps> = ({
  onChange,
  placeholder,
  value,
}) => {
  const classes = useStyles();

  defaultPluginsOptions.italic!.italic!.rootProps!.className += ` ${classes.slateItalic}`;
  defaultPluginsOptions.list!.ol!.rootProps!.className += ` ${classes.slateOrderedList}`;
  defaultPluginsOptions.list!.ul!.rootProps!.className += ` ${classes.slateUnorderedList}`;

  return (
    <div className={classes.wrapper}>
      <RichTextEditorMd
        className={classes.slateEditor}
        placeholder={placeholder}
        plugins={getDefaultPlugins(defaultPluginsOptions)}
        toolbarClassName={classes.slateToolbar}
        value={value}
        onAutoSave={(_, markdown) => onChange(markdown)}
      />
    </div>
  );
};

export default RichTextEditorWrapper;
