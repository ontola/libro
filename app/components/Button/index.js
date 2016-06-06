import './button.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

function Button({ weight, theme, children }) {
  let btnClass = classNames({
    btn: true,
    'btn--weight': weight,
    [`btn--${theme}`]: true,
  });

  return (
    <button className={btnClass}>{children}</button>
  );
}

Button.propTypes = {
  theme: PropTypes.oneOf([
    'box',
    'subtle',
    'default',
  ]),
  weight: PropTypes.bool,
  children: PropTypes.node.isRequired,
};


Button.defaultProps = {
  theme: 'default',
  weight: false,
  children: 'Joep',
};

export default Button;
