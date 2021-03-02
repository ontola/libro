import * as schema from '@ontologies/schema';
import {
  linkType,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';
import { useIntl } from 'react-intl';

import Detail from '../../../../components/Detail';
import teamGL from '../../../../ontology/teamGL';
import { allTopologies } from '../../../../topologies';

const propTypes = {
  endDate: linkType,
  linkedProp: linkedPropType,
};

const FORMAT = {
  day: 'numeric',
  month: 'long',
};

const isSameDay = (date1, date2) => (
  date1.getDate() === date2.getDate()
  && date1.getMonth() === date2.getMonth()
  && date1.getFullYear() === date2.getFullYear()
);

const dateString = (intl, date1, date2) => {
  if (!date2) {
    return intl.formatTime(date1, FORMAT);
  }
  if (isSameDay(date1, date2)) {
    return `${intl.formatTime(date1, FORMAT)} - ${intl.formatTime(date2)}`;
  }

  return `${intl.formatDate(date1, FORMAT)} - ${intl.formatDate(date2, FORMAT)}`;
};

const StartDate = ({ linkedProp, endDate }) => {
  const intl = useIntl();
  const date1 = new Date(linkedProp.value);
  const date2 = endDate && new Date(endDate.value);

  return (
    <Detail text={emoji(`📅 ${dateString(intl, date1, date2)}`)} />
  );
};

StartDate.type = teamGL.Event;

StartDate.property = schema.startDate;

StartDate.mapDataToProps = {
  endDate: schema.endDate,
};

StartDate.topology = allTopologies;

StartDate.propTypes = propTypes;

export default register(StartDate);
