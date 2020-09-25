import React, { useEffect, useMemo, useState } from 'react';
import { createEditor, Editor, Node, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { ReactEditor, Slate, withReact } from 'slate-react';

import { CommandPlugins } from '../plugins/types';
import { PluginEditor, withPlugins } from '../transforms/withPlugins';

import { EditableWithPlugins, EditableWithPluginsProps } from './EditableWithPlugins';

const AUTOSAVE_TIMEOUT = 10000;

export interface RichTextEditorProps extends EditableWithPluginsProps {
  onAutoSave?: (editor: PluginEditor, nodes: Node[]) => void;
  onChange?: (editor: PluginEditor, nodes: Node[]) => void;
  placeholder?: string;
  plugins?: CommandPlugins;
  value?: Node[];
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  onAutoSave,
  onChange,
  placeholder,
  plugins,
  value,
  ...props
}) => {
  const editor = useMemo(() => withPlugins(plugins || {})(withHistory(withReact(createEditor()))), []);

  const [normalizedValue, setNormalizedValue] = useState<Node[]>([]);
  const [timeoutID, setTimeoutID] = useState<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    /*
     * Slate throws an error if the value on the initial render is invalid.
     * Solution from https://github.com/ianstormtaylor/slate/issues/3465#issuecomment-655592962
     */
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    if (value) {
      editor.children = value;
    }
    Editor.normalize(editor, { force: true });
    Transforms.select(editor, [0]);
    // The rendering can take over from here:
    setNormalizedValue(editor.children);
  }, [value]);

  useEffect(() => {
    if (onAutoSave && ReactEditor.isFocused(editor)) {
      setTimeoutID(setTimeout(() => {
        onAutoSave(editor, normalizedValue);
      }, AUTOSAVE_TIMEOUT));
    }
  }, [normalizedValue, onAutoSave]);

  return (
    <Slate
      editor={editor}
      value={normalizedValue}
      onChange={(newValue: any) => {
        if (timeoutID) {
          clearTimeout(timeoutID);
        }
        setNormalizedValue(newValue);
        if (onChange) {
          onChange(editor, newValue);
        }
      }}>
        <EditableWithPlugins
          onBlur={() => {
            if (onAutoSave) {
              if (timeoutID) {
                clearTimeout(timeoutID);
              }
              onAutoSave(editor, normalizedValue);
            }
          }}
          placeholder={placeholder}
          plugins={plugins}
          {...props}
        />
    </Slate>
  );
};

export default RichTextEditor;
