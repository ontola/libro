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
  const progressClass = classNames({
    Progress: true,
    [`Progress--direction-${direction}`]: direction,
  });

  const HUNDRED_PERCENT = 100;

  return (
    <div className="Progress__Container">
      <div className={progressClass}>
        <div className="Progress__Total" />
        <div
          className="Progress__Completed"
          style={{
            height: `${completed / total * HUNDRED_PERCENT}%`,
          }}
        />
      </div>
    </div>
  );
};

Progress.propTypes = propTypes;

export default Progress;
