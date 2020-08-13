import React, { useCallback, useMemo } from 'react';
import { Node } from 'slate';

import { deserializeMarkdown } from '../markdown/deserializeMarkdown';
import { PluginEditor} from '../transforms/withPlugins';

import { EditableWithPluginsProps } from './EditableWithPlugins';
import RichTextEditor from './RichTextEditor';

export interface RichTextEditorMdProps extends EditableWithPluginsProps {
  onAutoSave?: (editor: PluginEditor, value: string) => void,
  onChange?: (editor: PluginEditor, value: string) => void,  
  value?: string,
}

export const RichTextEditorMd: React.FC<RichTextEditorMdProps> = ({ 
  plugins, 
  onAutoSave: onAutoSaveMd, 
  onChange: onChangeMd, 
  value: valueMd, 
  ...props 
}) => {

  const onAutoSave = useCallback(!onAutoSaveMd ? null : (editor: PluginEditor, nodes: Node[]) => {
    const markdown = editor.serializeMarkdown(nodes);
    onAutoSaveMd(editor, markdown);
  }, [onAutoSaveMd]);

  const onChange = useCallback(!onChangeMd ? null :  (editor: PluginEditor, nodes: Node[]) => {
    const markdown = editor.serializeMarkdown(nodes);
    onChangeMd(editor, markdown);
  }, [onChangeMd]);

  const value = useMemo(() => (
    [{ children: deserializeMarkdown(plugins)(valueMd) }]
  ), [valueMd]);
  
  return (
    <RichTextEditor
      plugins={plugins}
      onAutoSave={onAutoSave}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

export default RichTextEditorMd;
