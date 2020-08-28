import IconButton from '@material-ui/core/IconButton';
import * as schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import AttributeListItem from '../../components/AttributeListItem';
import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import HeaderWithMenu from '../../components/HeaderWithMenu';
import teamGL from '../../ontology/teamGL';
import AttributeList from '../../topologies/AttributeList';
import Card from '../../topologies/Card';
import { popupTopology } from '../../topologies/Popup';
import { useVisitPostalCode } from '../Glapp/helpers';


const PostalCodePopup = ({
  onClose,
  postalDigits,
}) => {
  const { visitPostalCode } = useVisitPostalCode();

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
          <Property label={schema.name} wrapper={React.Fragment} />
        </HeaderWithMenu>
        <Property endSpacing label={teamGL.meanPriority} />
        <AttributeList fullLabel>
          <AttributeListItem label={teamGL.totalFlyers} />
          <AttributeListItem label={teamGL.flyerVolunteers} />
          <AttributeListItem label={teamGL.activeFlyered} />
        </AttributeList>
        <Button centered onClick={() => visitPostalCode(postalDigits.value)}>Aan de slag!</Button>
      </CardContent>
    </Card>
  );
};

PostalCodePopup.type = teamGL.PostalCode;

PostalCodePopup.topology = popupTopology;

PostalCodePopup.mapDataToProps = {
  postalDigits: teamGL.postalDigits,
};

PostalCodePopup.propTypes = {
  onClose: PropTypes.func,
  postalDigits: linkType,
};

export default register(PostalCodePopup);
