import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';

import './Snackbar.scss';

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

const SnackbarComponent = ({
  reset,
  children,
  type,
}) => {
  const className = classNames({
    Snackbar: true,
    [`Snackbar--${type}`]: true,
  });

  return (
    <div className={className}>
      {type === 'error' && <div className="Snackbar__pretext">Error:</div>}
      <div className="Snackbar__text">{children}</div>
      <Button plain className="Button--snackbar" onClick={reset}>Dismiss</Button>
    </div>
  );
};

SnackbarComponent.propTypes = propTypes;
SnackbarComponent.defaultProps = defaultProps;

export default SnackbarComponent;
