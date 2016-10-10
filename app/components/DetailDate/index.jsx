import './DetailDate.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';
import { formatDate } from 'helpers/date';
import moment from 'moment';

const propTypes = {
  /** Deprecated - Try not to use this prop,
  *   since it does not tell anything about what this date means.
  */
  date: PropTypes.instanceOf(Date),
  createdAt: PropTypes.instanceOf(Date),
  updatedAt: PropTypes.instanceOf(Date),
  startsAt: PropTypes.instanceOf(Date),
  endsAt: PropTypes.instanceOf(Date),
};

const DetailDate = ({
  date,
  createdAt,
  updatedAt,
  startsAt,
  endsAt,
}) => {
  const mostImportantDate = () => (date || startsAt || createdAt);

  const hoverTextItems = [
    (date && `${formatDate(date)}`),
    (startsAt && `Begin: ${formatDate(startsAt)}`),
    (endsAt && `Einde: ${formatDate(endsAt)}`),
    (createdAt && `Aangemaakt: ${formatDate(createdAt)}`),
    (updatedAt && `Bijgewerkt: ${formatDate(updatedAt)}`),
  ];

  const REMOVE_CHARACTER_NUMBER = -2;
  const hoverText = hoverTextItems
                      .filter(i => i !== undefined)
                      .join('. \n')
                      .slice(0, REMOVE_CHARACTER_NUMBER);

  return (
    <Detail
      text={moment(mostImportantDate()).fromNow()}
      icon="clock-o"
      title={hoverText}
    />
  );
};
DetailDate.propTypes = propTypes;

export default DetailDate;
