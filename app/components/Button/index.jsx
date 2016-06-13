// @flow
import './button.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  weight: PropTypes.bool,
  theme: PropTypes.oneOf([
    'box',
    'subtle',
    'default',
  ]),
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  weight: false,
  theme: 'default',
  icon: '',
  children: 'Joep',
};

const Button = ({ weight, theme, icon, children, ...props }) => {
  const btnClass = classNames({
    btn: true,
    'btn--weight': weight,
    [`btn--${theme}`]: true,
  });

  return (
    <button {...props} className={btnClass} role="button">
      <FontAwesome name={icon} />{' '}
      Joe: {children}
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
