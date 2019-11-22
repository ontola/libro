import { literalShape } from '@ontola/mash';
import { link } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import DetailDate from '../DetailDate';

const propTypes = {
  dateCreated: literalShape,
  dateModified: literalShape,
  datePublished: literalShape,
  dateSubmitted: literalShape,
  duration: literalShape,
  endDate: literalShape,
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
  lastActivityAt: literalShape,
  startDate: literalShape,
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
  dateCreated: NS.schema('dateCreated'),
  dateModified: NS.schema('dateModified'),
  datePublished: NS.schema('datePublished'),
  duration: NS.schema('duration'),
  endDate: NS.schema('endDate'),
  lastActivityAt: NS.argu('lastActivityAt'),
  startDate: NS.schema('startDate'),
})(LinkedDetailDate);
