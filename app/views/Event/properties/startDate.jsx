import { linkedPropType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';
import { useIntl } from 'react-intl';

import { Detail } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

export const FORMAT = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const StartDate = ({ linkedProp }) => {
  const intl = useIntl();
  const date = new Date(linkedProp.value);

  return (
    <Detail text={emoji(`📅 ${intl.formatDate(date, FORMAT)}`)} />
  );
};

StartDate.type = NS.teamGL('Event');

StartDate.property = NS.schema('startDate');

StartDate.topology = allTopologies;

StartDate.propTypes = propTypes;

export default register(StartDate);
