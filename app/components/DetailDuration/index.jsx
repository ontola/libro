import React, { PropTypes } from 'react';
import classNames from 'classnames';

import { durationToHumanizedString } from 'helpers/date';

import Detail from '../Detail';

import './DetailDuration.scss';

const propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  floatRight: PropTypes.bool,
  isCurrent: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
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
      floatRight={floatRight}
      text={formattedDuration(totalDuration, completedDuration)}
    />
  );
};

DetailDuration.propTypes = propTypes;

export default DetailDuration;
