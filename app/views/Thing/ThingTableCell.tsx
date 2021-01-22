import { Literal } from '@ontologies/core';
import foaf from '@ontologies/foaf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Detail from '../../components/Detail';
import LDLink from '../../components/LDLink';
import { LinkFeature } from '../../components/Link';
import { tableCellTopology } from '../../topologies/TableCell';

const messages = defineMessages({
  showProfile: {
    defaultMessage: "Show {name}'s profile",
    id: 'https://app.argu.co/i18n/schema:Thing/showResourceText',
  },
});

interface PropTypes {
  name: Literal;
}

const ThingTableCell: FC<PropTypes> = ({ name }) => {
  const { formatMessage } = useIntl();

  return (
    <LDLink
      features={[LinkFeature.Bold, LinkFeature.Centered]}
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

export default register(ThingTableCell);
