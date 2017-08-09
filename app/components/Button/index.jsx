import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import LinkDuo from '../LinkDuo';

import './Button.scss';

const buttonThemes = [
  'default',
  'box',
  'subtle',
  'transparant',
  'pagination',
  'as-card',
  'card--big',
];

const propTypes = {
  /** Should be true when the button is toggleable and toggled. */
  active: PropTypes.bool,
  /** Alt html tag. */
  alt: PropTypes.string,
  /** Label of the button */
  children: PropTypes.node,
  /** Should be avoided. Try to use the 'theme' prop or wrap it in some other element for styling
  and use the 'plain' prop. */
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /** If the button is actually just a link */
  href: PropTypes.string,
  /** FontAwesome icon string. */
  icon: PropTypes.string,
  /** Set to true if the button should indicate that something is happening. Renders spinner. */
  loading: PropTypes.bool,
  /** Give some margins for inline usage */
  margins: PropTypes.bool,
  narrow: PropTypes.bool,
  onClick: PropTypes.func,
  /** Removes all styling. */
  plain: PropTypes.bool,
  small: PropTypes.bool,
  /** Removes all styling. */
  theme: PropTypes.oneOf(buttonThemes),
  title: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf(['yes', 'pro', 'neutral', 'no', 'con', 'upvote', 'comment', 'facebook', 'google']),
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
  margins,
  onClick,
  small,
  narrow,
  plain,
  theme,
  title,
  type,
  href,
  variant,
}) => {
  const btnClass = classNames({
    Button: true,
    'Button--active': active,
    'Button--has-icon': icon,
    'Button--margins': margins,
    'Button--narrow': narrow,
    'Button--plain': plain,
    'Button--small': small,
    [`Button--${theme}`]: theme,
    [`Button--variant-${variant}`]: variant,
    [className]: className,
  });

  // Used to remove the annoying focus outline border after clicking
  const onClickAndBlur = (e) => {
    if (onClick !== undefined) {
      onClick(e);
      // Only blur when the event is a click, not for using the Enter button.
      // React fires a clickEvent when the user uses Enter, but the coordinates are zero.
      if (e.nativeEvent.x !== 0) {
        e.target.blur();
      }
    }
  };

  const currentIcon = () => {
    if (loading) {
      return 'spinner';
    }
    return icon;
  };

  if (typeof href !== 'undefined') {
    return (
      <LinkDuo
        alt={alt}
        className={btnClass}
        data-test="Button-link"
        disabled={disabled || loading}
        role="button"
        title={title}
        to={href}
        type={type}
      >
        {icon &&
          <FontAwesome
            className="Button__icon"
            data-test="Button-icon"
            name={currentIcon()}
            spin={loading}
          />
        }
        <span className="Button__label">
          {children}
        </span>
      </LinkDuo>
    );
  }
  return (
    <button
      alt={alt}
      className={btnClass}
      data-test="Button-button"
      disabled={disabled || loading}
      title={title}
      type={type}
      onClick={onClickAndBlur}
    >
      {icon &&
        <FontAwesome
          className="Button__icon"
          data-test="Button-icon"
          name={currentIcon()}
          spin={loading}
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
