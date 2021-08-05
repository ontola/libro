import IconButton from '@material-ui/core/IconButton';
import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import AttributeListItem from '../../../components/AttributeListItem';
import Button from '../../../components/Button';
import CardContent from '../../../components/Card/CardContent';
import HeaderWithMenu from '../../../components/HeaderWithMenu';
import teamGL from '../../../ontology/teamGL';
import AttributeList from '../../../topologies/AttributeList';
import Card from '../../../topologies/Card';
import ContentDetails from '../../../topologies/ContentDetails';
import { alertDialogTopology } from '../../../topologies/Dialog';
import { formMessages } from '../../../translations/messages';
import { useVisitPostalCode } from '../Glapp/helpers';

interface PostalCodeDialogProps {
  onClose: () => void;
  postalDigits: SomeTerm;
}

const PostalCodeDialog: FC<PostalCodeDialogProps> = ({
  onClose,
  postalDigits,
}) => {
  const { formatMessage } = useIntl();
  const { visitPostalCode } = useVisitPostalCode();

  const closeButton = (
    <IconButton
      size="small"
      title={formatMessage(formMessages.close)}
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
        <ContentDetails>
          <Property endSpacing label={teamGL.department} />
        </ContentDetails>
        <Property endSpacing label={teamGL.meanPriority} />
        <AttributeList fullLabel>
          <AttributeListItem label={teamGL.doors} />
          <AttributeListItem label={teamGL.volunteers} />
          <AttributeListItem label={teamGL.active} />
        </AttributeList>
        <Button centered onClick={() => visitPostalCode(postalDigits.value)}>Aan de slag!</Button>
      </CardContent>
    </Card>
  );
};

PostalCodeDialog.type = teamGL.PostalCode;

PostalCodeDialog.topology = alertDialogTopology;

PostalCodeDialog.mapDataToProps = {
  postalDigits: teamGL.postalDigits,
};

export default register(PostalCodeDialog);
