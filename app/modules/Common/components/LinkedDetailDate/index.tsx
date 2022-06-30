import * as schema from '@ontologies/schema';
import { useLiterals } from 'link-redux';
import React from 'react';

import argu from '../../../Argu/lib/argu';
import DetailDate from '../DetailDate';

interface PropTypes {
  floatRight?: boolean;
}

const LinkedDetailDate: React.FC<PropTypes> = ({
  floatRight,
}) => {
  const [dateCreated] = useLiterals(schema.dateCreated);
  const [dateModified] = useLiterals(schema.dateModified);
  const [datePublished] = useLiterals(schema.datePublished);
  const [dateSubmitted] = useLiterals(schema.ns('dateSubmitted'));
  const [duration] = useLiterals(schema.duration);
  const [endDate] = useLiterals(schema.endDate);
  const [lastActivityAt] = useLiterals(argu.lastActivityAt);
  const [startDate] = useLiterals(schema.startDate);

  return (
    <DetailDate
      dateCreated={dateCreated}
      dateModified={dateModified}
      datePublished={datePublished}
      dateSubmitted={dateSubmitted}
      duration={duration}
      endDate={endDate}
      floatRight={floatRight}
      lastActivityAt={lastActivityAt}
      startDate={startDate}
    />
  );
};

export default LinkedDetailDate;
