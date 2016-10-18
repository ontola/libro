import './DetailDate.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';
import { formatDate, durationToHumanizedString } from 'helpers/date';
import moment from 'moment';

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

  const displayValue = () => {
    if (asHours) {
      return moment(mostImportantDate()).format('LT');
    }
    return moment(mostImportantDate()).fromNow();
  };

  return (
    <Detail
      text={displayValue()}
      icon="clock-o"
      title={hoverText}
      floatRight={floatRight}
      hideIcon={hideIcon}
    />
  );
};
DetailDate.propTypes = propTypes;

export default DetailDate;
