import React, { useCallback, useMemo } from 'react';
import { Node } from 'slate';

import { deserializeMarkdown } from '../markdown/deserializeMarkdown';
import { CommandPlugins } from '../plugins';
import { PluginEditor} from '../transforms/withPlugins';

import { EditableWithPluginsProps } from './EditableWithPlugins';
import RichTextEditor from './RichTextEditor';

export type editorCallback = (editor: PluginEditor, value: string) => void;

export interface RichTextEditorMdProps extends EditableWithPluginsProps {
  onAutoSave?: editorCallback;
  onChange?: editorCallback;
  placeholder?: string;
  plugins?: CommandPlugins;
  value?: string;
}

const useEditorCallbackIfPresent = (callback: editorCallback | undefined) => useCallback(
  callback
    ? (editor: PluginEditor, nodes: Node[]) => {
      const markdown = editor.serializeMarkdown(nodes);
      callback(editor, markdown);
    }
    : () => undefined,
  [callback],
);

export const RichTextEditorMd: React.FC<RichTextEditorMdProps> = ({
  onAutoSave: onAutoSaveMd,
  onChange: onChangeMd,
  placeholder,
  plugins,
  value: valueMd,
  ...props
}) => {
  const onAutoSave = useEditorCallbackIfPresent(onAutoSaveMd);
  const onChange = useEditorCallbackIfPresent(onChangeMd);

  const value = useMemo(() => (
    [{ children: deserializeMarkdown(plugins || {})(valueMd || '') }]
  ), [valueMd]);

  return (
    <RichTextEditor
      onAutoSave={onAutoSave}
      onChange={onChange}
      placeholder={placeholder}
      plugins={plugins}
      value={value}
      {...props}
    />
  );
};

export default RichTextEditorMd;
