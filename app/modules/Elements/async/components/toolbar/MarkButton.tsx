import {
  getPreventDefaultHandler,
  isMarkActive,
  toggleMark,
} from '@udecode/plate-common';
import React from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';
import { ReactEditor } from 'slate-react';

import { ElementsEditor } from '../../editor';
import { ToggleButton } from '../ToggleButton';

export interface MarkButtonProps {
  buttonRef?: React.Ref<HTMLButtonElement>,
  children: any;
  title: MessageDescriptor;
  type: string;
}

export const MarkButton: React.FC<MarkButtonProps> = ({
  buttonRef,
  children,
  title,
  type,
}) => {
  const intl = useIntl();

  return (
    <ToggleButton
      buttonRef={buttonRef}
      id={type}
      selected={(editor: ElementsEditor) => !!type && isMarkActive(editor, type)}
      title={intl.formatMessage(title)}
      value={type}
      onClick={(editor: ElementsEditor) => {
        const handler = getPreventDefaultHandler(toggleMark, editor, type);

        return (e) => {
          handler(e);
          ReactEditor.focus(editor);
        };
      }}
    >
      {children}
    </ToggleButton>
  );
};
