import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { motionMessages } from '../../../../../translations/messages';
import Detail from '../../../../Common/components/Detail';
import { tryParseInt } from '../../../../Common/lib/numbers';
import { detailsBarTopology } from '../../../../Common/topologies/DetailsBar';
import argu from '../../../lib/argu';

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
