import { Literal } from '@ontologies/core';
import React from 'react';
import { FormattedRelativeTime } from 'react-intl';

import { relativeTimeDestructure } from '../../helpers/date';

export interface RelativeDateProps {
  date: Literal;
}

const RelativeDate = ({ date }: RelativeDateProps): JSX.Element | null => {
  if (!date) {
    return null;
  }

  return (
    <FormattedRelativeTime {...relativeTimeDestructure(new Date(date.value).getTime())} />
  );
};

export default RelativeDate;
