import './DetailDate.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';
import { formatDateFromNow, formatDate, durationToHumanizedString } from 'helpers/date';

const propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  /** Deprecated - Try not to use Date,
  *   since it does not tell anything about what this date means.
  */
  date: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  floatRight: PropTypes.bool,
  asHours: PropTypes.bool,
  hideIcon: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
  updatedDate: PropTypes.instanceOf(Date),
  // For linking to an event, like a meeting
  url: PropTypes.string,
};

const DetailDate = ({
  createdAt,
  date,
  endDate,
  floatRight,
  startDate,
  updatedDate,
  asHours,
  hideIcon,
  url,
}) => {
  const mostImportantDate = () => (date || startDate || createdAt);

  const hoverTextItems = [
    (date && `${formatDate(date)}`),
    (startDate && `Begin: ${formatDate(startDate)}`),
    (endDate && `Einde: ${formatDate(endDate)}`),
    (createdAt && `Aangemaakt: ${formatDate(createdAt)}`),
    (updatedDate && `Bijgewerkt: ${formatDate(updatedDate)}`),
    (endDate && startDate && `Duur: ${durationToHumanizedString(Math.abs(endDate - startDate))}`),
  ];

  const hoverText = hoverTextItems
    .filter(i => i !== undefined)
    .join('. \n')
    .concat('.');

  const displayValue = asHours
    ? formatDate(mostImportantDate(), 'LT')
    : formatDateFromNow(mostImportantDate());

  return (
    <Detail
      text={displayValue}
      // icon="clock-o"
      title={hoverText}
      floatRight={floatRight}
      hideIcon={hideIcon}
      url={url}
    />
  );
};
DetailDate.propTypes = propTypes;

export default DetailDate;
