import IconButton from '@material-ui/core/IconButton';
import schema from '@ontologies/schema';
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
import teamGL from '../../ontology/teamGL';
import ActionsBar from '../../topologies/ActionsBar';
import Card from '../../topologies/Card';
import ContentDetails from '../../topologies/ContentDetails';
import { popupTopology } from '../../topologies/Popup';

const EventPopup = ({
  onClose,
}) => {
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
    <Card>
      <CardContent endSpacing>
        <HeaderWithMenu
          menu={closeButton}
        >
          <Property label={schema.name} />
        </HeaderWithMenu>
        <ContentDetails>
          <Property label={teamGL.department} />
          <Property label={schema.startDate} />
          <Property label={schema.location} />
        </ContentDetails>
        <Property label={schema.text} />
      </CardContent>
      <ActionsBar>
        <Property label={ontola.signUpAction} />
      </ActionsBar>
    </Card>
  );
};

EventPopup.type = teamGL.Event;

EventPopup.topology = popupTopology;

EventPopup.propTypes = {
  onClose: PropTypes.func,
};

export default register(EventPopup);
