import './Button.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

const buttonThemes = [
  'default',
  'box',
  'subtle',
  'transparant',
  'as-box',
];

const propTypes = {
  /** Should be true when the button is toggleable and toggled. */
  active: PropTypes.bool,
  /** Alt html tag. */
  alt: PropTypes.string,
  /** Should be avoided. Try to use the 'theme' prop or wrap it in some other element for styling
  and use the 'plain' prop. */
  className: PropTypes.string,
  /** Label of the button */
  children: PropTypes.node,
  disabled: PropTypes.bool,
  /** FontAwesome icon string. */
  icon: PropTypes.string,
  /** Set to true if the button should indicate that something is happening. Renders spinner. */
  loading: PropTypes.bool,
  narrow: PropTypes.bool,
  onClick: PropTypes.func,
  /** Removes all styling. */
  plain: PropTypes.bool,
  small: PropTypes.bool,
  /** Removes all styling. */
  theme: PropTypes.oneOf(buttonThemes),
  type: PropTypes.string,
  variant: PropTypes.oneOf(['yes', 'neutral', 'no', 'upvote', 'comment']),
};

const defaultProps = {
  active: false,
  narrow: false,
  plain: false,
  small: false,
  theme: 'default',
  type: 'button',
};

/**
 * Used for any action in the app. Handles touch events and blurs after handling the onClick.
 * @returns {component} Component
 */
const Button = ({
  active,
  alt,
  children,
  className,
  disabled,
  icon,
  loading,
  onClick,
  small,
  narrow,
  plain,
  theme,
  type,
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
    if (onClick !== undefined) {
      onClick(e);
      document.activeElement.blur();
    }
  };

  const currentIcon = () => {
    if (loading) {
      return 'spinner';
    }
    return icon;
  };

  return (
    <button
      onClick={onClickAndBlur}
      className={`${btnClass} ${className}`}
      role="button"
      type={type}
      alt={alt}
      disabled={disabled || loading}
    >
      {icon &&
        <FontAwesome
          className="Button__icon"
          spin={loading}
          name={currentIcon()}
        />
      }
      <span className="Button__label">
        {children}
      </span>
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
