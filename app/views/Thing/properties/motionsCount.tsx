import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import Detail from '../../../components/Detail';
import { tryParseInt } from '../../../helpers/numbers';
import argu from '../../../ontology/argu';
import { detailsBarTopology } from '../../../topologies';
import { motionMessages } from '../../../translations/messages';

const MotionsCount = ({ linkedProp }: PropertyProps): JSX.Element | null => {
  const { formatMessage } = useIntl();

  if (tryParseInt(linkedProp) === 0) {
    return null;
  }

  return (
    <Detail
      icon="lightbulb-o"
      text={linkedProp.value}
      title={formatMessage(
        motionMessages.motionsCount,
        { count: linkedProp.value },
      )}
    />
  );
};

MotionsCount.type = schema.Thing;

MotionsCount.property = argu.motionsCount;

MotionsCount.topology = detailsBarTopology;

export default register(MotionsCount);
