// @flow
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './Progress.scss';

import { calcPercentage } from 'helpers/numbers';

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

  return (
    <div className="Progress__container">
      <div className={progressClass}>
        <div className="Progress__total" />
        <div
          className="Progress__completed"
          style={{
            height: `${calcPercentage(completed, total)}%`,
          }}
        />
      </div>
    </div>
  );
};

Progress.propTypes = propTypes;

export default Progress;
