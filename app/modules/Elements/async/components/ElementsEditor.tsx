import { Plate } from '@udecode/plate';
import { UseSlatePropsOptions } from '@udecode/plate-core';
import React from 'react';

// import { CommandPlugins } from '../plugins/types';
// import { PluginEditor } from '../transforms/withPlugins';

// import { EditableWithPluginsProps } from './EditableWithPlugins';

export interface ElementsEditorProps extends UseSlatePropsOptions {
  // onBlur?: (editor: PluginEditor, nodes: Node[]) => void;
  // onChange: (editor: PluginEditor, nodes: Node[]) => void;
  placeholder?: string;
  // plugins?: CommandPlugins;
  value: Node[];
}

export const ElementsEditor: React.FC<ElementsEditorProps> = ({
  value,
}) =>
// const editor = useMemo(() => withPlugins(plugins || {})(withHistory(withReact(createEditor()))), []);

// const [normalizedValue, setNormalizedValue] = useState<Node[]>([]);
// const [debouncedOnChange] = useDebouncedCallback((newValue: Node[]) => onChange(editor, newValue), DEBOUNCE_TIMEOUT);

  (
    <Plate
      initialValue={value}
    />
  )

// useEffect(() => {
//   /*
//    * Slate throws an error if the value on the initial render is invalid.
//    * Solution from https://github.com/ianstormtaylor/slate/issues/3465#issuecomment-655592962
//    */
//   if (value) {
//     editor.children = value;
//   }
//
//   Editor.normalize(editor, { force: true });
//
//   if (editor.selection) {
//     try {
//       ReactEditor.toDOMRange(editor, editor.selection);
//     } catch {
//       Transforms.select(editor, findValidSlatePoint(editor, editor.selection.focus));
//     }
//   }
//
//   // The rendering can take over from here:
//   setNormalizedValue(editor.children);
// }, [value]);
//
// return (
//   <Slate
//     editor={editor}
//     value={normalizedValue}
//     onChange={(newValue: Node[]) => {
//       setNormalizedValue(newValue);
//       debouncedOnChange(newValue);
//     }}
//   >
//     <EditableWithPlugins
//       placeholder={placeholder}
//       plugins={plugins}
//       onBlur={onBlur && (() => onBlur(editor, normalizedValue))}
//       {...props}
//     />
//   </Slate>
// );
;
