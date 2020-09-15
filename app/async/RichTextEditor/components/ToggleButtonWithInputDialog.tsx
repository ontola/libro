import React, { useCallback, useEffect, useState } from 'react';
import { Editor, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { InputDialog } from './InputDialog';
import { ToggleButton } from './ToggleButton';

export interface ToggleButtonWithInputDialogProps {
  buttonId: string;
  buttonSelected: (editor: Editor) => boolean;
  buttonTitle: string;
  children: any;
  dialogButtonCancel?: string;
  dialogButtonOK?: string;
  dialogInputType: string;
  dialogText: string;
  dialogTitle: string;
  onDialogOK: (editor: Editor) => (event: any) => any;
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
}) => {
  const editor: ReactEditor = useSlate();

  const [open, setOpen] = React.useState(false);
  const [selection, setSelection] = useState<any>(null);

  const handleButtonClick = useCallback((editor1: Editor) => (event: MouseEvent) => {
    event.preventDefault();
    // Selection is lost with dialog
    setSelection(editor1.selection);
    setOpen(true);
  }, []);

  const handleDialogOK = useCallback((editor1: Editor) => (input: string) => {
      Transforms.select(editor1, selection);
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
        onClick={handleButtonClick}
        selected={buttonSelected}
        title={buttonTitle}
      >
        {children}
      </ToggleButton>
      <InputDialog
        buttonCancel={dialogButtonCancel}
        buttonOK={dialogButtonOK}
        callback={handleDialogOK(editor)}
        id={`dialog_${buttonId}`}
        open={open}
        setOpen={setOpen}
        text={dialogText}
        title={dialogTitle}
        type={dialogInputType}
      />
    </div>
  );
};
