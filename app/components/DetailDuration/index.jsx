import './DetailDuration.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';
import classNames from 'classnames';
import { durationToString } from 'helpers/date';

const propTypes = {
  elapsedTime: PropTypes.number,
  totalTime: PropTypes.number,
  isCurrent: PropTypes.bool,
};

const DetailDuration = ({
  elapsedTime,
  totalTime,
  isCurrent,
}) => {
  const formattedDuration = (total, elapsed) => {
    if (elapsed && total) {
      return (
        `${durationToString(elapsed)} / ${durationToString(total)}`
      );
    } else if (elapsed) {
      return durationToString(elapsed);
    }
    return durationToString(total);
  };

  const elapsedTimeClass = classNames({
    DetailDuration: true,
    'DetailDuration--isCurrent': isCurrent,
  });

  return (
    <Detail
      className={elapsedTimeClass}
      text={formattedDuration(totalTime, elapsedTime)}
      icon="clock-o"
    />
  );
};

DetailDuration.propTypes = propTypes;

export default DetailDuration;
