import schema from '@ontologies/schema';
import RDFTypes from '@rdfdev/prop-types';
import { link } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';
import DetailDate from '../DetailDate';

const propTypes = {
  dateCreated: RDFTypes.literal,
  dateModified: RDFTypes.literal,
  datePublished: RDFTypes.literal,
  dateSubmitted: RDFTypes.literal,
  duration: RDFTypes.literal,
  endDate: RDFTypes.literal,
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
  lastActivityAt: RDFTypes.literal,
  startDate: RDFTypes.literal,
};

const LinkedDetailDate = ({
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

LinkedDetailDate.propTypes = propTypes;

export default link({
  dateCreated: schema.dateCreated,
  dateModified: schema.dateModified,
  datePublished: schema.datePublished,
  duration: schema.duration,
  endDate: schema.endDate,
  lastActivityAt: argu.lastActivityAt,
  startDate: schema.startDate,
})(LinkedDetailDate);
