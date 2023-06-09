import { makeStyles } from '@mui/styles';
import React from 'react';

import { TextEditorProps } from '../../components/TextEditor';

import PlainEditor from './PlainEditor';

const useStyles = makeStyles({
  editor: {
    flex: 1,
    position: 'relative',
  },
});

const TextEditor = ({
  autoFocus,
  maxLength,
  minLength,
  name,
  placeholder,
  required,
  rows,
  value,
  onBlur,
  onFocus,
  onChange,
}: TextEditorProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.editor}>
      <PlainEditor
        autoFocus={autoFocus}
        id={name}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>
  );
};

export default TextEditor;
