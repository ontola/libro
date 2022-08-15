import { FC, register } from 'link-redux';
import React from 'react';

import { alertDialogTopology } from '../../../Common/topologies';
import CollectionProvider, { CollectionProviderProps } from '../../components/CollectionProvider';

import { CollectionTypes } from './types';

type CollectionDialogProps = CollectionProviderProps;

const CollectionDialog: FC<CollectionDialogProps> = (props) => (
  <CollectionProvider
    renderWhenEmpty
    {...props}
  />
);

CollectionDialog.type = CollectionTypes;

CollectionDialog.topology = alertDialogTopology;

export default register(CollectionDialog);

