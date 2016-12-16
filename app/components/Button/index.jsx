import './Button.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import { buttonThemes } from 'components/shared/config';

const propTypes = {
  /** Should be true when the button is toggleable and toggled. */
  active: PropTypes.bool,
  alt: PropTypes.string,
  className: PropTypes.string,
  /** Label of the button */
  children: PropTypes.node,
  icon: PropTypes.string,
  narrow: PropTypes.bool,
  onClick: PropTypes.func,
  plain: PropTypes.bool,
  small: PropTypes.bool,
  theme: PropTypes.oneOf(buttonThemes),
  variant: PropTypes.oneOf(['pro', 'neutral', 'con', 'upvote', 'comment']),
};

const defaultProps = {
  active: false,
  narrow: false,
  plain: false,
  small: false,
  theme: 'default',
};

const Button = ({
  active,
  alt,
  children,
  className,
  icon,
  onClick,
  small,
  narrow,
  plain,
  theme,
  variant,
}) => {
  const btnClass = classNames({
    Button: true,
    'Button--has-icon': icon,
    'Button--small': small,
    'Button--narrow': narrow,
    'Button--plain': plain,
    [`Button--${theme}`]: theme,
    [`Button--variant-${variant}`]: variant,
    'Button--active': active,
  });

  // Used to remove the annoying focus outline border after clicking
  const onClickAndBlur = (e) => {
    onClick(e);
    document.activeElement.blur();
  };

  return (
    <button
      onClick={onClickAndBlur}
      className={`${btnClass} ${className}`}
      role="button"
      type="button"
      alt={alt}
    >
      {icon && <FontAwesome className="Button__icon" name={icon} />}
      <span className="Button__label">{children}</span>
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
