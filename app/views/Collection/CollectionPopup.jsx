import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import * as as from '@ontologies/as';
import {
  Property,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import CardContent from '../../components/Card/CardContent';
import HeaderWithMenu from '../../components/HeaderWithMenu';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import CardList from '../../topologies/Card/CardList';
import { popupTopology } from '../../topologies/Popup';

import { CollectionTypes } from './types';

const useStyles = makeStyles(() => ({
  wrapper: {
    minWidth: '15em',
  },
}));

const CollectionPopup = ({
  onClose,
}) => {
  const classes = useStyles();

  const closeButton = (
    <IconButton
      size="small"
      title="Sluiten"
      type="button"
      onClick={onClose}
    >
      <FontAwesome name="close" />
    </IconButton>
  );

  return (
    <Card className={classes.wrapper}>
      <CardContent>
        <HeaderWithMenu
          menu={closeButton}
        >
          <Property label={as.name} />
        </HeaderWithMenu>
        <CardList direction="column">
          <Property forceRender insideCollection label={ontola.pages} />
        </CardList>
      </CardContent>
    </Card>
  );
};

CollectionPopup.type = CollectionTypes;

CollectionPopup.topology = popupTopology;

CollectionPopup.mapDataToProps = {
  collectionType: ontola.collectionType,
  totalItems: as.totalItems,
};

CollectionPopup.propTypes = {
  onClose: PropTypes.func,
};

export default register(CollectionPopup);
