import IconButton from '@mui/material/IconButton';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { useIntl } from 'react-intl';

import { formMessages } from '../../../../translations/messages';
import AttributeListItem from '../../../Common/components/AttributeListItem';
import Button from '../../../Common/components/Button';
import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';
import AttributeList from '../../../Common/topologies/AttributeList';
import Card from '../../../Common/topologies/Card';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import teamGL from '../../ontology/teamGL';
import { useVisitPostalCode } from '../Glapp/helpers';

interface PostalCodeDialogProps {
  onClose: () => void;
}

const PostalCodeDialog: FC<PostalCodeDialogProps> = ({ onClose }) => {
  const [postalDigits] = useProperty(teamGL.postalDigits);

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
          <Property
            label={schema.name}
            wrapper={React.Fragment}
          />
        </HeaderWithMenu>
        <ContentDetails>
          <Property
            endSpacing
            label={teamGL.department}
          />
        </ContentDetails>
        <Property
          endSpacing
          label={teamGL.meanPriority}
        />
        <AttributeList fullLabel>
          <AttributeListItem label={teamGL.doors} />
          <AttributeListItem label={teamGL.volunteers} />
          <AttributeListItem label={teamGL.active} />
        </AttributeList>
        <Button
          centered
          onClick={() => visitPostalCode(postalDigits.value)}
        >
          Aan de slag!
        </Button>
      </CardContent>
    </Card>
  );
};

PostalCodeDialog.type = teamGL.PostalCode;

PostalCodeDialog.topology = alertDialogTopology;

export default register(PostalCodeDialog);
