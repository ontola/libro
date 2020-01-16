import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Detail from '../../../components/Detail';
import argu from '../../../ontology/argu';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const messages = defineMessages({
  motionsCount: {
    defaultMessage: '{count} ideas',
    id: 'https://app.argu.co/i18n/argu:Motion/argu:motionsCount/label',
  },
});

const MotionsCount = ({ linkedProp }) => {
  const { formatMessage } = useIntl();

  if (linkedProp.value === '0') {
    return null;
  }

  return (
    <Detail
      icon="lightbulb-o"
      text={linkedProp.value}
      title={formatMessage(
        messages.motionsCount,
        { count: linkedProp.value }
      )}
    />
  );
};

MotionsCount.type = schema.Thing;

MotionsCount.property = argu.motionsCount;

MotionsCount.topology = detailsBarTopology;

MotionsCount.propTypes = {
  linkedProp: linkedPropType,
};


export default register(MotionsCount);
