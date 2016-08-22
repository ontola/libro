import './Button.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import { buttonThemes, sides } from 'components/shared/config';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  small: PropTypes.bool,
  theme: PropTypes.oneOf(buttonThemes),
  variant: PropTypes.oneOf(sides),
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
    'Button--has-icon': icon,
    'Button--small': small,
    [`Button--${theme}`]: theme,
    [`Button--variant-${variant}`]: variant,
  });

  return (
    <button
      onClick={onClick}
      className={btnClass}
      role="button"
      type="button"
    >
      {icon && <FontAwesome className="Button__icon" name={icon} />}
      <span className="Button__label">{children}</span>
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
