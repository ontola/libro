import './DetailElapsedTime.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';
import classNames from 'classnames';
import { durationToString } from 'helpers/date';

const propTypes = {
  elapsedTime: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
  isCurrent: PropTypes.bool,
};

const DetailElapsedTime = ({
  elapsedTime,
  totalTime,
  isCurrent,
}) => {
  let formattedDuration = `${durationToString(elapsedTime)} / ${durationToString(totalTime)}`;

  const elapsedTimeClass = classNames({
    DetailElapsedTime: true,
    'DetailElapsedTime--isCurrent': isCurrent,
  });

  return (
    <Detail
      className={elapsedTimeClass}
      text={formattedDuration}
      icon="clock-o"
    />
  );
};

DetailElapsedTime.propTypes = propTypes;

export default DetailElapsedTime;
