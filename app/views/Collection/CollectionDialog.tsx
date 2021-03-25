import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import * as as from '@ontologies/as';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import HeaderWithMenu from '../../components/HeaderWithMenu';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';

import { CollectionTypes } from './types';

const useStyles = makeStyles((theme: any) => ({
  wrapper: {
    background: theme.palette.background.default,
    borderRadius: '.5em',
    overflow: 'hidden',
    padding: '1em',
  },
}));

interface CollectionDialogProps {
  onDone: () => void;
}

const CollectionDialog: FC<CollectionDialogProps> = ({ onDone, subject }) => {
  const classes = useStyles();
  const closeButton = (
    <IconButton
      size="small"
      title="Sluiten"
      type="button"
      onClick={onDone}
    >
      <FontAwesome name="close" />
    </IconButton>
  );

  return (
    <Container className={classes.wrapper}>
      <HeaderWithMenu
        menu={closeButton}
      >
        <Property label={as.name} wrapper={React.Fragment} />
      </HeaderWithMenu>
      <Resource hideHeader subject={subject} />
    </Container>
  );
};

CollectionDialog.type = CollectionTypes;

CollectionDialog.topology = alertDialogTopology;

export default register(CollectionDialog);
