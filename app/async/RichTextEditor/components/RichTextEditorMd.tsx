import React, { useCallback, useMemo, useRef } from 'react';
import { Node } from 'slate';

import { deserializeMarkdown } from '../markdown/deserializeMarkdown';
import { CommandPlugins } from '../plugins';
import { PluginEditor} from '../transforms/withPlugins';

import { EditableWithPluginsProps } from './EditableWithPlugins';
import RichTextEditor from './RichTextEditor';

export type editorCallback = (value: string) => void;

export interface RichTextEditorMdProps extends Omit<EditableWithPluginsProps, 'onBlur'> {
  onBlur?: editorCallback;
  onChange: editorCallback;
  placeholder?: string;
  plugins?: CommandPlugins;
  value?: string;
}

export interface EditorValues {
  value?: Node[];
  valueMd?: string;
}

const useEditorCallbackIfPresent = (
  callback: editorCallback | undefined,
  currentValues: EditorValues,
) => useCallback(
  callback
    ? (editor: PluginEditor, nodes: Node[]) => {
      const markdown = editor.serializeMarkdown(nodes);
      currentValues.value = nodes;
      currentValues.valueMd = markdown;
      callback(markdown);
    }
    : () => undefined,
  [callback],
);

export const RichTextEditorMd: React.FC<RichTextEditorMdProps> = ({
  onBlur: onBlurMd,
  onChange: onChangeMd,
  placeholder,
  plugins,
  value: valueMd,
  ...props
}) => {
  const values = useRef<EditorValues>({
    value: undefined,
    valueMd: undefined,
  });

  const onBlur = useEditorCallbackIfPresent(onBlurMd, values.current);
  const onChange = useEditorCallbackIfPresent(onChangeMd, values.current);

  const value = useMemo(() => {
    if (valueMd && valueMd === values.current.valueMd) {
      return values.current.value;
    } else {
      return [{ children: deserializeMarkdown(plugins || {})(valueMd || '') }];
    }
  }, [valueMd]);

  return (
    <RichTextEditor
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      plugins={plugins}
      value={value}
      {...props}
    />
  );
};

export default RichTextEditorMd;
