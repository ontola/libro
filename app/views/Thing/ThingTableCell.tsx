import { Literal } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import LDDetail from '../../components/LDDetail';
import LDLink from '../../components/LDLink';
import { LinkFeature } from '../../components/Link';
import { tableCellTopology } from '../../topologies/TableCell';
import { thingMessages } from '../../translations/messages';

interface PropTypes {
  name: Literal;
}

const ThingTableCell: FC<PropTypes> = ({ name }) => {
  const { formatMessage } = useIntl();

  return (
    <LDLink
      features={[LinkFeature.Bold, LinkFeature.Centered]}
      title={formatMessage(thingMessages.showProfile, { name: name?.value })}
    >
      <LDDetail text={name?.value} />
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
