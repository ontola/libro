import { getPreventDefaultHandler } from '@udecode/plate-common';
import { SPEditor } from '@udecode/plate-core';
import { WithListOptions, toggleList } from '@udecode/plate-list';
import React from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';

import { isElementTypeActive } from '../../utils/isElementTypeActive';
import { ToggleButton } from '../ToggleButton';

export interface ListButtonProps {
  children: any;
  options?: WithListOptions;
  title: MessageDescriptor;
  type: string;
}

export const ListButton: React.FC<ListButtonProps> = ({
  children,
  title,
  type,
}) => {
  const intl = useIntl();

  return (
    <ToggleButton
      id={type}
      selected={isElementTypeActive(type)}
      title={intl.formatMessage(title)}
      onClick={(editor: SPEditor) => getPreventDefaultHandler(
        toggleList,
        editor,
        {
          type,
        },
      )}
    >
      {children}
    </ToggleButton>
  );
};
