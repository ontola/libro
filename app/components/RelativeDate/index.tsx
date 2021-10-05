import { Literal } from '@ontologies/core';
import React from 'react';
import { FormattedRelativeTime, useIntl } from 'react-intl';

import { relativeTimeDestructure } from '../../helpers/date';
import { filterUpdateInterval, useDateUpdateInterval } from '../../hooks/useDateUpdateInterval';
import { DATE_FORMAT } from '../DetailDate';

export interface RelativeDateProps {
  date: Literal;
  title?: string;
}

const RelativeDate = ({
  date,
  title,
}: RelativeDateProps): JSX.Element | null => {
  const intl = useIntl();
  const interval = useDateUpdateInterval();

  if (!date) {
    return null;
  }

  const dateObj = new Date(date.value);
  const renderTitle = title || intl.formatTime(dateObj, DATE_FORMAT);
  const timeStructure = relativeTimeDestructure(dateObj.getTime());

  return (
    <div title={renderTitle}>
      <FormattedRelativeTime
        updateIntervalInSeconds={filterUpdateInterval(timeStructure.unit, interval)}
        {...timeStructure}
      />
    </div>
  );
};

export default RelativeDate;
