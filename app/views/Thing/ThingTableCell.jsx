import { literalShape } from '@ontola/mash';
import { register } from 'link-redux';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import {
  Detail,
  LDLink,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
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
      property={NS.schema('name').value}
      title={formatMessage(messages.showProfile, { name: name?.value })}
    >
      <Detail
        linkedImage
        text={name?.value}
      />
    </LDLink>
  );
};

ThingTableCell.type = [NS.schema('Thing'), NS.rdfs('Resource')];

ThingTableCell.topology = [tableCellTopology];

ThingTableCell.mapDataToProps = {
  name: {
    label: [
      NS.schema('name'),
      NS.foaf('name'),
    ],
  },
};

ThingTableCell.propTypes = {
  name: literalShape,
};

export default register(ThingTableCell);
