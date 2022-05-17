import { makeStyles } from '@material-ui/core/styles';
import { PlateStoreState } from '@udecode/plate-core/dist/types/PlateStore';
import React from 'react';
import {
  HeadingToolbar,
  Plate,
} from '@udecode/plate';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { config } from '../lib/config';
import { editorClassName } from '../lib/editorClassName';
import { plugins } from '../lib/plugins';

import { MarkBallonToolbar, ToolbarButtons } from './Toolbars';

// const DEBOUNCE_TIMEOUT = 1000;

export interface ElementsEditorProps {
  // onBlur?: (editor: PluginEditor, nodes: Node[]) => void;
  // onChange?: (editor: PluginEditor, nodes: Node[]) => void;
  id: string;
  placeholder?: string;
  // plugins?: CommandPlugins;
  value?: PlateStoreState['value'];
}

const useStyles = makeStyles({
  toolbar: {
    [`.${editorClassName} &`]: {
      backgroundColor: 'white',
      marginLeft: 0,
      marginRight: 0,
      position: 'sticky !important' as unknown,
      top: 0,
      zIndex: 1,
    },
  },
});

export const ElementsEditor = ({
  id,
  value,
}: ElementsEditorProps): JSX.Element => {
  const classes = useStyles();

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editableProps={config.editableProps}
        id={id}
        initialValue={value}
        plugins={plugins}
        onChange={(v) => console.log('Test', v)}
      >
        <HeadingToolbar className={classes.toolbar}>
          <ToolbarButtons />
        </HeadingToolbar>

        <MarkBallonToolbar />
      </Plate>
    </DndProvider>
  );
};

// export const ElementsEditor2: React.FC<ElementsEditorProps> = ({
//   onBlur,
//   onChange,
//   placeholder,
//   plugins,
//   value,
//   ...props
// }) => {
//   const editor = useMemo(() => withPlugins(plugins || {})(withHistory(withReact(createEditor()))), []);
//
//   const [normalizedValue, setNormalizedValue] = useState<Node[]>([]);
//   const [debouncedOnChange] = useDebouncedCallback((newValue: Node[]) => onChange(editor, newValue), DEBOUNCE_TIMEOUT);
//
//   useEffect(() => {
//     /*
//      * Slate throws an error if the value on the initial render is invalid.
//      * Solution from https://github.com/ianstormtaylor/slate/issues/3465#issuecomment-655592962
//      */
//     if (value) {
//       editor.children = value;
//     }
//
//     Editor.normalize(editor, { force: true });
//
//     if (editor.selection) {
//       try {
//         ReactEditor.toDOMRange(editor, editor.selection);
//       } catch {
//         Transforms.select(editor, findValidSlatePoint(editor, editor.selection.focus));
//       }
//     }
//
//     // The rendering can take over from here:
//     setNormalizedValue(editor.children);
//   }, [value]);
//
//   return (
//     <Slate
//       editor={editor}
//       value={normalizedValue}
//       onChange={(newValue: Node[]) => {
//         setNormalizedValue(newValue);
//         debouncedOnChange(newValue);
//       }}
//     >
//       <EditableWithPlugins
//         placeholder={placeholder}
//         plugins={plugins}
//         onBlur={onBlur && (() => onBlur(editor, normalizedValue))}
//         {...props}
//       />
//     </Slate>
//   );
// };
//
// export default ElementsEditor;
