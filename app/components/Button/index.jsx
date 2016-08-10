// @flow
import './button.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  small: PropTypes.bool,
  type: PropTypes.string,
  theme: PropTypes.oneOf([
    'box',
    'subtle',
    'default',
    'pro',
    'con',
    'neutral',
  ]),
  variant: PropTypes.oneOf([
    'pro',
    'con',
    'neutral',
  ]),
};

const defaultProps = {
  useDefaultClassName: true,
  small: false,
  theme: 'default',
  type: 'button',
  icon: '',
  children: '',
};

const Button = ({
  children,
  icon,
  onClick,
  small,
  theme,
  type,
  variant,
}) => {
  const btnClass = classNames({
    Button: true,
    'Button--small': small,
    [`Button--${theme}`]: true,
    [`Button--variant-${variant}`]: true,
  });

  return (
    <button
      onClick={onClick}
      className={btnClass}
      role="button"
      type={type}
    >
      <FontAwesome name={icon} />
      {' '}
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
