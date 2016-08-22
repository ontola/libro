import './Notification.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.string,
  type: PropTypes.oneOf([
    'error',
    'message',
  ]),
};

const defaultProps = {
  type: 'message',
};

const Notification = ({ children, type }) => {
  const className = classNames({
    Notification: true,
    [`Notification--${type}`]: true,
  });

  return (
    <div className={className}>
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
