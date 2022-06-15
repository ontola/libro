import { Literal } from '@ontologies/core';
import React from 'react';
import { FormattedRelativeTime } from 'react-intl';

import { filterUpdateInterval, useDateUpdateInterval } from '../../hooks/useDateUpdateInterval';
import { relativeTimeDestructure } from '../../lib/date';

export interface RelativeDateProps {
  date: Literal;
  title?: string;
}

const RelativeDate = ({
  date,
}: RelativeDateProps): JSX.Element | null => {
  const interval = useDateUpdateInterval();

  if (!date) {
    return null;
  }

  const dateObj = new Date(date.value);
  const timeStructure = relativeTimeDestructure(dateObj.getTime());

  return (
    <FormattedRelativeTime
      updateIntervalInSeconds={filterUpdateInterval(timeStructure.unit, interval)}
      {...timeStructure}
    />
  );
};

export default RelativeDate;
