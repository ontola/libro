import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';

import Detail from '../Detail';

import './DetailDate.scss';

const propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  /** Deprecated - Try not to use Date,
  *   since it does not tell anything about what this date means.
  */
  date: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
  intl: PropTypes.shape({
    formatDate: PropTypes.func,
    formatRelative: PropTypes.func,
    formatTime: PropTypes.func,
  }),
  startDate: PropTypes.instanceOf(Date),
  submittedAt: PropTypes.instanceOf(Date),
  updatedDate: PropTypes.instanceOf(Date),
  // For linking to an event, like a meeting
  url: PropTypes.string,
};

const DetailDate = ({
  createdAt,
  date,
  endDate,
  floatRight,
  intl: {
    formatDate,
    formatRelative,
    formatTime,
  },
  startDate,
  updatedDate,
  hideIcon,
  submittedAt,
  url,
}) => {
  const hoverTextItems = [
    (date && `${formatTime(date)}`),
    (startDate && `Begin: ${formatTime(startDate)}`),
    (endDate && `Einde: ${formatTime(endDate)}`),
    (createdAt && `Aangemaakt: ${formatTime(createdAt)}`),
    (submittedAt && `Ingediend: ${formatTime(submittedAt)}`),
    (updatedDate && `Bijgewerkt: ${formatTime(updatedDate)}`),
    (endDate && startDate && `Duur: ${formatRelative(startDate, { now: endDate })}`),
  ];

  const hoverText = hoverTextItems
    .filter(i => i !== undefined)
    .join('. \n')
    .concat('.');

  return (
    <Detail
      floatRight={floatRight}
      hideIcon={hideIcon}
      text={formatDate(date || startDate || createdAt || submittedAt)}
      title={hoverText}
      url={url}
    />
  );
};
DetailDate.propTypes = propTypes;

export default injectIntl(DetailDate);
