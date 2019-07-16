import { link } from 'link-redux';
import PropTypes from 'prop-types';
import { Literal } from 'rdflib';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import DetailDate from '../DetailDate';

const propTypes = {
  dateCreated: PropTypes.instanceOf(Literal),
  dateModified: PropTypes.instanceOf(Literal),
  datePublished: PropTypes.instanceOf(Literal),
  dateSubmitted: PropTypes.instanceOf(Literal),
  duration: PropTypes.instanceOf(Literal),
  endDate: PropTypes.instanceOf(Literal),
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
  lastActivityAt: PropTypes.instanceOf(Literal),
  startDate: PropTypes.instanceOf(Literal),
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

export default link([
  NS.argu('lastActivityAt'),
  NS.schema('startDate'),
  NS.schema('endDate'),
  NS.schema('dateCreated'),
  NS.schema('datePublished'),
  NS.schema('dateModified'),
  NS.schema('duration'),
  NS.schema('endDate'),
  NS.schema('startDate'),
])(LinkedDetailDate);
