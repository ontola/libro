import { getAbove } from '@udecode/plate-common';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import { ElementsEditor, useElementsEditor } from '../editor';

import { InputDialog } from './InputDialog';
import { ToggleButton } from './ToggleButton';

export interface ToggleButtonWithInputDialogProps {
  buttonId: string;
  buttonSelected: (editor: ElementsEditor) => boolean;
  buttonTitle: string;
  children: any;
  dialogButtonCancel?: string;
  dialogButtonOK?: string;
  dialogInputType: string;
  dialogText: string;
  dialogTitle: string;
  onDialogOK: (editor: ElementsEditor) => (event: any) => any;
  type: string;
}

export const ToggleButtonWithInputDialog: React.FC<ToggleButtonWithInputDialogProps> = ({
  buttonId,
  buttonSelected,
  buttonTitle,
  children,
  dialogButtonCancel,
  dialogButtonOK,
  dialogInputType,
  dialogText,
  dialogTitle,
  onDialogOK,
  type,
}) => {
  const editor = useElementsEditor();

  const [open, setOpen] = React.useState(false);
  const [initialValue, setInitialValue] = React.useState('');
  const [selection, setSelection] = useState<any>(null);

  React.useEffect(() => {
    if (!editor.selection) {
      return;
    }

    const linkNode = getAbove(editor, {
      match: { type },
    });

    setInitialValue(linkNode?.[0]?.url ?? '');
  }, [editor.selection]);

  const handleButtonClick = useCallback((editor1: ElementsEditor) => (event: MouseEvent) => {
    event.preventDefault();

    // Selection is lost with dialog
    setSelection(editor1.selection);
    setOpen(true);
  }, []);

  const handleDialogOK = useCallback((editor1: ElementsEditor) => (input: string) => {
    Transforms.select(editor1, selection);
    setInitialValue('');
    onDialogOK(editor)(input);
  }, [selection]);

  useEffect(() => {
    if (!open) {
      ReactEditor.focus(editor);
    }
  }, [open]);

  return (
    <div>
      <ToggleButton
        id={buttonId}
        selected={buttonSelected}
        title={buttonTitle}
        onClick={handleButtonClick}
      >
        {children}
      </ToggleButton>
      <InputDialog
        buttonCancel={dialogButtonCancel}
        buttonOK={dialogButtonOK}
        callback={handleDialogOK(editor)}
        id={`dialog_${buttonId}`}
        initialValue={initialValue}
        open={open}
        setOpen={setOpen}
        text={dialogText}
        title={dialogTitle}
        type={dialogInputType}
      />
    </div>
  );
};
