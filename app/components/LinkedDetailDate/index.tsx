import { Literal } from '@ontologies/core';
import schema from '@ontologies/schema';
import { link } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import DetailDate from '../DetailDate';

interface PropTypes {
  dateCreated?: Literal;
  dateModified?: Literal;
  datePublished?: Literal;
  dateSubmitted?: Literal;
  duration?: Literal;
  endDate?: Literal;
  floatRight?: boolean;
  hideIcon?: boolean;
  lastActivityAt?: Literal;
  startDate?: Literal;
}

const LinkedDetailDate: React.FC<PropTypes> = ({
  dateCreated,
  dateModified,
  datePublished,
  dateSubmitted,
  duration,
  endDate,
  floatRight,
  hideIcon,
  lastActivityAt,
  startDate,
}) => (
  <DetailDate
    linkedImage
    dateCreated={dateCreated}
    dateModified={dateModified}
    datePublished={datePublished}
    dateSubmitted={dateSubmitted}
    duration={duration}
    endDate={endDate}
    floatRight={floatRight}
    hideIcon={hideIcon}
    lastActivityAt={lastActivityAt}
    startDate={startDate}
  />
);

export default link({
  dateCreated: schema.dateCreated,
  dateModified: schema.dateModified,
  datePublished: schema.datePublished,
  duration: schema.duration,
  endDate: schema.endDate,
  lastActivityAt: argu.lastActivityAt,
  startDate: schema.startDate,
})(LinkedDetailDate);
