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
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  useDefaultClassName: true,
  weight: false,
  theme: 'default',
  icon: '',
  children: 'Joep',
};

const Button = ({ weight, theme, icon, children, className, onClick }) => {
  const btnClass = classNames({
    btn: true,
    'btn--weight': weight,
    [`btn--${theme}`]: true,
  }, className);

  return (
    <button onClick={onClick} className={btnClass} role="button">
      <FontAwesome name={icon} />{' '}
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
