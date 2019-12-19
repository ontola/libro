import RDFTypes from '@rdfdev/prop-types';
import foaf from '@ontologies/foaf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { register } from 'link-redux';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import {
  Detail,
  LDLink,
} from '../../components';
import { tableCellTopology } from '../../topologies/TableCell';

const messages = defineMessages({
  showProfile: {
    defaultMessage: "Show {name}'s profile",
    id: 'https://app.argu.co/i18n/schema:Thing/showResourceText',
  },
});

const ThingTableCell = ({ name }) => {
  const { formatMessage } = useIntl();

  return (
    <LDLink
      features={['bold', 'centered']}
      property={schema.name.value}
      title={formatMessage(messages.showProfile, { name: name?.value })}
    >
      <Detail
        linkedImage
        text={name?.value}
      />
    </LDLink>
  );
};

ThingTableCell.type = [schema.Thing, rdfs.Resource];

ThingTableCell.topology = [tableCellTopology];

ThingTableCell.mapDataToProps = {
  name: {
    label: [
      schema.name,
      foaf.name,
    ],
  },
};

ThingTableCell.propTypes = {
  name: RDFTypes.literal,
};

export default register(ThingTableCell);
