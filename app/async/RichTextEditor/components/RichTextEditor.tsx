import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Editor,
  Node,
  Transforms,
  createEditor,
} from 'slate';
import { withHistory } from 'slate-history';
import {
  ReactEditor,
  Slate,
  withReact,
} from 'slate-react';
import { useDebouncedCallback } from 'use-debounce';

import { CommandPlugins } from '../plugins/types';
import { PluginEditor, withPlugins } from '../transforms/withPlugins';
import { findValidSlatePoint } from '../utils';

import { EditableWithPlugins, EditableWithPluginsProps } from './EditableWithPlugins';

const DEBOUNCE_TIMEOUT = 1000;

export interface RichTextEditorProps extends Omit<EditableWithPluginsProps, 'onBlur'> {
  onBlur?: (editor: PluginEditor, nodes: Node[]) => void;
  onChange: (editor: PluginEditor, nodes: Node[]) => void;
  placeholder?: string;
  plugins?: CommandPlugins;
  value?: Node[];
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  onBlur,
  onChange,
  placeholder,
  plugins,
  value,
  ...props
}) => {
  const editor = useMemo(() => withPlugins(plugins || {})(withHistory(withReact(createEditor()))), []);

  const [normalizedValue, setNormalizedValue] = useState<Node[]>([]);
  const [debouncedOnChange] = useDebouncedCallback((newValue: Node[]) => onChange(editor, newValue), DEBOUNCE_TIMEOUT);

  useEffect(() => {
    /*
     * Slate throws an error if the value on the initial render is invalid.
     * Solution from https://github.com/ianstormtaylor/slate/issues/3465#issuecomment-655592962
     */
    if (value) {
      editor.children = value;
    }
    Editor.normalize(editor, { force: true });
    if (editor.selection) {
      try {
        ReactEditor.toDOMRange(editor, editor.selection);
      } catch {
        Transforms.select(editor, findValidSlatePoint(editor, editor.selection.focus));
      }
    }
    // The rendering can take over from here:
    setNormalizedValue(editor.children);
  }, [value]);

  return (
    <Slate
      editor={editor}
      value={normalizedValue}
      onChange={(newValue: Node[]) => {
        setNormalizedValue(newValue);
        debouncedOnChange(newValue);
      }}
    >
      <EditableWithPlugins
        placeholder={placeholder}
        plugins={plugins}
        onBlur={onBlur && (() => onBlur(editor, normalizedValue))}
        {...props}
      />
    </Slate>
  );
};

export default RichTextEditor;
