import './DetailDuration.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';
import classNames from 'classnames';
import { durationToString } from 'helpers/date';

const propTypes = {
  startDate: PropTypes.instanceOf(Date),
  currentDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  isCurrent: PropTypes.bool,
};

const DetailDuration = ({
  startDate,
  endDate,
  currentDate,
  isCurrent,
}) => {
  const totalDuration = () => Math.abs(endDate - startDate);
  const completedDuration = () => Math.abs(currentDate - startDate);

  console.log(completedDuration());
  console.log(totalDuration());

  const formattedDuration = () => {
    if (currentDate && endDate && startDate) {
      return (
        `${durationToString(completedDuration())} / ${durationToString(totalDuration())}`
      );
    } else if (currentDate && startDate) {
      return durationToString(completedDuration());
    }
    return durationToString(totalDuration());
  };

  const elapsedTimeClass = classNames({
    DetailDuration: true,
    'DetailDuration--is-current': isCurrent,
  });

  return (
    <Detail
      className={elapsedTimeClass}
      text={formattedDuration(totalDuration, completedDuration)}
      icon="clock-o"
    />
  );
};

DetailDuration.propTypes = propTypes;

export default DetailDuration;
