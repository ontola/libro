import * as schema from '@ontologies/schema';
import {
  PropertyProps,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';
import {
  FormatDateOptions,
  IntlShape,
  useIntl,
} from 'react-intl';

import Detail from '../../../../../components/Detail';
import teamGL from '../../../../../ontology/teamGL';
import { allTopologies } from '../../../../../topologies';

const FORMAT: FormatDateOptions = {
  day: 'numeric',
  month: 'long',
};

const isSameDay = (date1: Date, date2: Date) => (
  date1.getDate() === date2.getDate()
  && date1.getMonth() === date2.getMonth()
  && date1.getFullYear() === date2.getFullYear()
);

const dateString = (intl: IntlShape, date1: Date, date2: Date) => {
  if (!date2) {
    return intl.formatTime(date1, FORMAT);
  }

  if (isSameDay(date1, date2)) {
    return `${intl.formatTime(date1, FORMAT)} - ${intl.formatTime(date2)}`;
  }

  return `${intl.formatDate(date1, FORMAT)} - ${intl.formatDate(date2, FORMAT)}`;
};

const StartDate = ({ linkedProp }: PropertyProps) => {
  const intl = useIntl();
  const [endDate] = useProperty(schema.endDate);
  const date1 = new Date(linkedProp.value);
  const date2 = endDate && new Date(endDate.value);

  return (
    <Detail text={emoji(`📅 ${dateString(intl, date1, date2)}`)} />
  );
};

StartDate.type = teamGL.Event;

StartDate.property = schema.startDate;

StartDate.topology = allTopologies;

export default register(StartDate);
