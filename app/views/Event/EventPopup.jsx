import IconButton from '@material-ui/core/IconButton';
import schema from '@ontologies/schema';
import {
  Property,
  register, topologyType, useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import HeaderWithMenu from '../../components/HeaderWithMenu';
import ontola from '../../ontology/ontola';
import teamGL from '../../ontology/teamGL';
import ActionsBar from '../../topologies/ActionsBar';
import Card, { CardContent } from '../../topologies/Card';
import { containerTopology } from '../../topologies/Container';
import ContentDetails from '../../topologies/ContentDetails';
import { alertDialogTopology } from '../../topologies/Dialog';
import { popupTopology } from '../../topologies/Popup';

const EventPopup = ({
  onClose,
  topology,
}) => {
  const lrs = useLRS();
  const handleClose = topology === alertDialogTopology ? lrs.actions.ontola.hideDialog() : onClose;
  const closeButton = handleClose && (
    <IconButton
      size="small"
      title="Sluiten"
      type="button"
      onClick={handleClose}
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
          <Property label={teamGL.eventType} />
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

EventPopup.topology = [
  alertDialogTopology,
  containerTopology,
  popupTopology,
];

EventPopup.propTypes = {
  onClose: PropTypes.func,
  topology: topologyType,
};

export default register(EventPopup);
