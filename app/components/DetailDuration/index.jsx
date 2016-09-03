import './DetailDuration.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';
import classNames from 'classnames';
import { durationToString } from 'helpers/date';

const propTypes = {
  elapsedTime: PropTypes.number,
  totalTime: PropTypes.number.isRequired,
  isCurrent: PropTypes.bool,
};

const DetailDuration = ({
  elapsedTime,
  totalTime,
  isCurrent,
}) => {
  // Can't get this to work. Seems to return null, instead of the string.
  // const formattedDuration = () => {
  //   if (elapsedTime) {
  //     return (
  //       `${durationToString(elapsedTime)} / ${durationToString(totalTime)}`
  //     );
  //   }
  //   console.log(durationToString(totalTime));
  //   return durationToString(totalTime);
  // };

  const formattedDuration = (`${durationToString(elapsedTime)} / ${durationToString(totalTime)}`);

  const elapsedTimeClass = classNames({
    DetailDuration: true,
    'DetailDuration--isCurrent': isCurrent,
  });

  return (
    <Detail
      className={elapsedTimeClass}
      text={formattedDuration}
      icon="clock-o"
    />
  );
};

DetailDuration.propTypes = propTypes;

export default DetailDuration;
