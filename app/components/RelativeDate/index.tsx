import { Literal } from '@ontologies/core';
import React from 'react';
import { FormattedRelativeTime, useIntl } from 'react-intl';

import { relativeTimeDestructure } from '../../helpers/date';
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

  if (!date) {
    return null;
  }

  const dateObj = new Date(date.value);
  const renderTitle = title || intl.formatTime(dateObj, DATE_FORMAT);

  return (
    <div title={renderTitle}>
      <FormattedRelativeTime {...relativeTimeDestructure(dateObj.getTime())} />
    </div>
  );
};

export default RelativeDate;
