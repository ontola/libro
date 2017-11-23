import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { calcPercentage } from '../../helpers/numbers';

import './Progress.scss';

const propTypes = {
  completed: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([
    'down',
    'right',
  ]),
  total: PropTypes.number.isRequired,
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
