import React, { PropTypes } from 'react';
import classNames from 'classnames';

import { durationToHumanizedString } from 'helpers/date';

import Detail from '../Detail';

import './DetailDuration.scss';

const propTypes = {
  startDate: PropTypes.instanceOf(Date),
  currentDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  isCurrent: PropTypes.bool,
  floatRight: PropTypes.bool,
};

const DetailDuration = ({
  startDate,
  endDate,
  currentDate,
  isCurrent,
  floatRight,
}) => {
  const totalDuration = () => Math.abs(endDate - startDate);
  const completedDuration = () => Math.abs(currentDate - startDate);

  const formattedDuration = () => {
    if (currentDate && endDate && startDate) {
      return (
        `${durationToHumanizedString(completedDuration())} / \
        ${durationToHumanizedString(totalDuration())}`
      );
    } else if (currentDate && startDate) {
      return durationToHumanizedString(completedDuration());
    }
    return durationToHumanizedString(totalDuration());
  };

  const elapsedTimeClass = classNames({
    DetailDuration: true,
    'DetailDuration--is-current': isCurrent,
  });

  return (
    <Detail
      className={elapsedTimeClass}
      text={formattedDuration(totalDuration, completedDuration)}
      floatRight={floatRight}
    />
  );
};

DetailDuration.propTypes = propTypes;

export default DetailDuration;
