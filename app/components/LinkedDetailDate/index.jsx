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
    dateCreated={dateCreated && new Date(dateCreated.value)}
    dateModified={dateModified && new Date(dateModified.value)}
    datePublished={datePublished && new Date(datePublished.value)}
    dateSubmitted={dateSubmitted && new Date(dateSubmitted.value)}
    duration={duration && new Date(duration.value)}
    endDate={endDate && new Date(endDate.value)}
    floatRight={floatRight}
    hideIcon={hideIcon}
    lastActivityAt={lastActivityAt && new Date(lastActivityAt.value)}
    startDate={startDate && new Date(startDate.value)}
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
