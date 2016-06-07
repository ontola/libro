import './button.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

const Button = ({ weight, theme, icon, children, ...props }) => {

  const btnClass = classNames({
    btn: true,
    'btn--weight': weight,
    [`btn--${theme}`]: true,
  });

  return (
    <button {...props} className={btnClass}>
      <FontAwesome name={icon} />{' '}
      {children}
    </button>
  );
}

Button.propTypes = {
  weight: PropTypes.bool,
  theme: PropTypes.oneOf([
    'box',
    'subtle',
    'default',
  ]),
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  weight: false,
  theme: 'default',
  icon: '',
  children: 'Joep',
};

export default Button;
