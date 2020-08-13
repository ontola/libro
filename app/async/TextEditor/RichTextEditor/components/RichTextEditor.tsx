import React, { useEffect, useMemo, useState } from 'react';
import { createEditor, Editor, Node } from 'slate';
import { withHistory } from 'slate-history';
import { ReactEditor, Slate, withReact } from 'slate-react';

import { PluginEditor, withPlugins } from '../transforms/withPlugins';

import { EditableWithPlugins, EditableWithPluginsProps } from './EditableWithPlugins';

export interface RichTextEditorProps extends EditableWithPluginsProps {
  onAutoSave?: (editor: PluginEditor, nodes: Node[]) => void,
  onChange?: (editor: PluginEditor, nodes: Node[]) => void,  
  value?: Node[],
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ plugins, onAutoSave, onChange, value, ...props }) => {
  const editor = useMemo(() => withPlugins(plugins)(withHistory(withReact(createEditor()))), []);

  const [normalizedValue, setNormalizedValue] = useState<Node[]>([]);
  const [timeoutID, setTimeoutID] = useState(0);

  useEffect(() => {
    // Slate throws an error if the value on the initial render is invalid.
    // Solution from https://github.com/ianstormtaylor/slate/issues/3465#issuecomment-655592962
    clearTimeout(timeoutID);
    editor.children = value;
    Editor.normalize(editor, { force: true });
    // The rendering can take over from here:
    setNormalizedValue(editor.children);
  }, [value]);

  useEffect(() => {
    if (onAutoSave && ReactEditor.isFocused(editor)) {
      setTimeoutID(setTimeout(() => {
        onAutoSave(editor, normalizedValue);
      }, 10000));
    }
  }, [normalizedValue, onAutoSave]);

  return (
    <div>
      <Slate
        editor={editor}
        value={normalizedValue}
        onChange={(newValue: any) => {
          clearTimeout(timeoutID);
          setNormalizedValue(newValue);
          if (onChange) {
            onChange(editor, newValue);
          }
        }}>
          <EditableWithPlugins
            plugins={plugins}
            onBlur={() => {
              if (onAutoSave) {
                clearTimeout(timeoutID);
                onAutoSave(editor, normalizedValue);
              }
            }}
            {...props}
          />
      </Slate>
    </div>
  );
};

export default RichTextEditor;
