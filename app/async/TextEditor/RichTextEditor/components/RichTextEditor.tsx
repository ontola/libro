import React, { useEffect, useMemo, useState } from 'react';
import { createEditor, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { ReactEditor, Slate, withReact } from 'slate-react';

import { withPlugins } from '../transforms/withPlugins';

import { EditableWithPlugins } from './EditableWithPlugins';

var autoSaveTimeout: any;

export interface SlateWithPluginsProps {

}

export const RichTextEditor = ({ value, onAutoSave, onChange, toolbarStyle, ...props }: { [key: string]: any; }) => {
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
          onAutoSave(editor, internalValue);
      }, 10000);
    }
  }, [internalValue, onAutoSave]);

  return (
    <div>
      <Slate
        editor={editor}
        value={internalValue}
        onChange={(newValue: any) => {
          clearTimeout(autoSaveTimeout);
          setInternalValue(newValue);
          if (onChange) {
            onChange(editor, newValue);
          }
        }}>
          <EditableWithPlugins
            onBlur={() => {
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

export default RichTextEditor;
