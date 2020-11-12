import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import as from '@ontologies/as';
import {
  Property,
  Resource,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import HeaderWithMenu from '../../components/HeaderWithMenu';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';

import { CollectionTypes } from './types';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: theme.palette.background.default,
    borderRadius: '.5em',
    overflow: 'hidden',
    padding: '1em',
  },
}));

const CollectionDialog = ({ onDone, subject }) => {
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

CollectionDialog.propTypes = {
  onDone: PropTypes.func,
  subject: subjectType,
};

export default register(CollectionDialog);
