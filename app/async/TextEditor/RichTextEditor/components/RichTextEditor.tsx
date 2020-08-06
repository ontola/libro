import React, { useState, useMemo, useEffect } from 'react';
import { createEditor, Editor } from 'slate';
import { Slate, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { EditableWithPlugins } from './EditableWithPlugins';
import { withPlugins } from '../transforms/withPlugins';

var autoSaveTimeout: any;

export interface SlateWithPluginsProps {

}

export const RichTextEditor = ({ value, onAutoSave, onChange, toolbarStyle, ...props }: {[key: string]: any;}) => {
  const editor = useMemo(() => withPlugins(withHistory(withReact(createEditor()))), []);

  const [externalValue, setExternalValue] = useState(value);
  const [internalValue, setInternalValue] = useState(value);

  if (value !== externalValue) {
    setInternalValue(value);
    setExternalValue(value);
    clearTimeout(autoSaveTimeout);
  }

  useEffect(() => {
    Editor.normalize(editor, { force: true });
  }, [externalValue]);

  useEffect(() => {
    if (onAutoSave && ReactEditor.isFocused(editor)) {
      autoSaveTimeout = setTimeout(() => {
          onAutoSave(editor,internalValue);
      }, 10000);
    }
  }, [internalValue, onAutoSave]);

  return (
    <div>
      <Slate
        editor={editor}
        value={internalValue}
        onChange={(value: any) => {
          clearTimeout(autoSaveTimeout);
          setInternalValue(value);
          if (onChange) onChange(editor, value);
        }}>
          <EditableWithPlugins 
            onBlur={e => {
              if (onAutoSave) {
                onAutoSave(editor, internalValue);
              }
            }}
            toolbarStyles={{
              root: ['slate-HeadingToolbar', toolbarStyle],
            }}
            {...props}
          />
      </Slate>
    </div>
  );
};