import { makeStyles } from '@mui/styles';
import { PlateStoreState } from '@udecode/plate-core/dist/types/PlateStore';
import React from 'react';
import {
  HeadingToolbar,
  Plate,
  createPlateEditor,
} from '@udecode/plate';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { config } from '../lib/config';
import { editorClassName } from '../lib/editorClassName';
import { plugins } from '../lib/plugins';

import { MarkBallonToolbar, ToolbarButtons } from './Toolbars';

export interface ElementsEditorProps {
  onChange?: (value: PlateStoreState['value']) => void;
  id: string;
  placeholder?: string;
  value?: PlateStoreState['value'];
}

const useStyles = makeStyles({
  toolbar: {
    [`.${editorClassName} &`]: {
      backgroundColor: 'white',
      marginBottom: 0,
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
  onChange,
}: ElementsEditorProps): JSX.Element => {
  const classes = useStyles();

  const [editor, setEditor] = React.useState(() => createPlateEditor({
    id,
    plugins,
  }));

  React.useEffect(() => {
    if (id !== editor.id) {
      setEditor(createPlateEditor({
        id,
        plugins,
      }));
    }
  }, [id]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editableProps={config.editableProps}
        editor={editor}
        id={id}
        initialValue={value}
        onChange={(v) => {
          const isAstChange = editor.operations.some(
            (op) => 'set_selection' !== op.type,
          );

          if (isAstChange && onChange) {
            onChange(v);
          }
        }}
      >
        <HeadingToolbar className={classes.toolbar}>
          <ToolbarButtons />
        </HeadingToolbar>

        <MarkBallonToolbar />
      </Plate>
    </DndProvider>
  );
};
