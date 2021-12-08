import IconButton from '@material-ui/core/IconButton';
import { FC, register } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import CollectionProvider, { CollectionProviderProps } from '../../components/Collection/CollectionProvider';
import { alertDialogTopology } from '../../topologies/Dialog';
import { formMessages } from '../../translations/messages';

import { CollectionTypes } from './types';

interface CloseDialogButtonProps {
  onDone: () => void;
}

type CollectionDialogProps = CollectionProviderProps & CloseDialogButtonProps;

const CloseDialogButton = ({
  onDone,
}: CloseDialogButtonProps) => {
  const { formatMessage } = useIntl();

  return (
    <IconButton
      size="small"
      title={formatMessage(formMessages.close)}
      type="button"
      onClick={onDone}
    >
      <FontAwesome name="close" />
    </IconButton>
  );
};

const CollectionDialog: FC<CollectionDialogProps> = ({ onDone, ...props }) => (
  <CollectionProvider
    renderWhenEmpty
    headerButtons={<CloseDialogButton onDone={onDone} />}
    {...props}
  />
);

CollectionDialog.type = CollectionTypes;

CollectionDialog.topology = alertDialogTopology;

export default register(CollectionDialog);
