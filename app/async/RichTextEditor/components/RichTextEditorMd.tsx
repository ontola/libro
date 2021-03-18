import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Node } from 'slate';

import { deserializeMarkdown } from '../markdown/deserializeMarkdown';
import { CommandPlugins } from '../plugins';
import { PluginEditor } from '../transforms/withPlugins';

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
  setValues: (state: EditorValues) => void,
) => useCallback(
  callback
    ? (editor: PluginEditor, nodes: Node[]) => {
      const markdown = editor.serializeMarkdown(nodes);
      setValues({
        value: nodes,
        valueMd: markdown,
      });
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
  const [currentValues, setCurrentValues] = useState<EditorValues>({
    value: undefined,
    valueMd: undefined,
  });

  const onBlur = useEditorCallbackIfPresent(onBlurMd, setCurrentValues);
  const onChange = useEditorCallbackIfPresent(onChangeMd, setCurrentValues);

  const value = useMemo(() => {
    if (valueMd && valueMd === currentValues.valueMd) {
      return currentValues.value;
    }

    return [{ children: deserializeMarkdown(plugins || {})(valueMd || '') }];
  }, [valueMd]);

  return (
    <RichTextEditor
      placeholder={placeholder}
      plugins={plugins}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      {...props}
    />
  );
};

export default RichTextEditorMd;
