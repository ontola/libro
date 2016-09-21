// @flow
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './Progress.scss';

const propTypes = {
  completed: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([
    'down',
    'right',
  ]),
};

const Progress = ({
  completed,
  total,
  direction,
}) => {
  const TO_PERCENTAGE = 100;
  const progressClass = classNames({
    Progress: true,
    [`Progress--direction-${direction}`]: direction,
  });

  return (
    <div className="Progress__container">
      <div className={progressClass}>
        <div className="Progress__total" />
        <div
          className="Progress__completed"
          style={{
            height: `${completed / total * TO_PERCENTAGE}%`,
          }}
        />
      </div>
    </div>
  );
};

Progress.propTypes = propTypes;

export default Progress;
