import classNames from 'classnames';
import React, { PropTypes } from 'react';

import Button from '../Button';

import './Notification.scss';

const propTypes = {
  children: PropTypes.string,
  reset: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'error',
    'message',
  ]),
};

const defaultProps = {
  type: 'message',
};

const Notification = ({
  reset,
  children,
  type,
}) => {
  const className = classNames({
    Notification: true,
    [`Notification--${type}`]: true,
  });

  return (
    <div className={className}>
      <Button small onClick={() => reset()} theme="subtle">x</Button>
      {type === 'error' &&
        <div className="Notification__pretext">Error:</div>
      }
      <div className="Notification__text">{children}</div>
    </div>
  );
};

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default Notification;
