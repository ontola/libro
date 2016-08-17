// @flow
import './Button.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  small: PropTypes.bool,
  theme: PropTypes.oneOf([
    'box',
    'subtle',
    'default',
  ]),
  variant: PropTypes.oneOf([
    'pro',
    'con',
    'neutral',
  ]),
};

const defaultProps = {
  small: false,
  theme: 'default',
  children: '',
};

const Button = ({
  children,
  icon,
  onClick,
  small,
  theme,
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
      type="button"
    >
      {icon && <FontAwesome name={icon} />}
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
