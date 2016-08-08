// @flow
import './button.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  small: PropTypes.bool,
  theme: PropTypes.oneOf([
    'box',
    'subtle',
    'default',
    'pro',
    'con',
    'neutral',
  ]),
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  useDefaultClassName: true,
  small: false,
  theme: 'default',
  icon: '',
  children: '',
};

const Button = ({ small, theme, icon, children, onClick }) => {
  const btnClass = classNames({
    btn: true,
    'btn--small': small,
    [`btn--${theme}`]: true,
  });

  return (
    <button onClick={onClick} className={btnClass} role="button" tabIndex="0">
      <FontAwesome name={icon} />{' '}
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
