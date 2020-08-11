import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import BlurButton from '../BlurButton';
import LinkDuo from '../LinkDuo';

import './Button.scss';

const buttonThemes = [
  'as-card',
  'box',
  'card--big',
  'default',
  'pagination',
  'submit',
  'subtle',
  'transparant',
];

const propTypes = {
  /** Should be true when the button is toggleable and toggled. */
  active: PropTypes.bool,
  /** Additional aria label */
  ariaLabel: PropTypes.string,
  centered: PropTypes.bool,
  /** Label of the button */
  children: PropTypes.node,
  /** Should be avoided. Try to use the 'theme' prop or wrap it in some other element for styling
  and use the 'plain' prop. */
  className: PropTypes.string,
  /** Displays button on top right position of relative parent */
  corner: PropTypes.bool,
  disabled: PropTypes.bool,
  /** Whether the button should fill it's container */
  grow: PropTypes.bool,
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
  /** Title html tag. */
  title: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf([
    'success',
    'warning',
    'error',
    'yes',
    'pro',
    'neutral',
    'other',
    'no',
    'con',
    'upvote',
    'comment',
    'facebook',
    'google',
  ]),
};

const defaultProps = {
  active: false,
  corner: false,
  grow: false,
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
  ariaLabel,
  centered,
  children,
  className,
  corner,
  disabled,
  grow,
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
    'Button--centered': centered,
    'Button--corner': corner,
    'Button--grow': grow,
    'Button--has-children': children,
    'Button--has-icon': icon,
    'Button--margins': margins,
    'Button--narrow': narrow,
    'Button--plain': plain,
    'Button--small': small,
    [`Button--${theme}`]: theme,
    [`Button--variant-${variant}`]: variant,
    [className]: className,
  });

  const currentIcon = loading ? 'spinner' : icon && normalizeFontAwesomeIRI(icon);

  const sharedProps = {
    'aria-label': ariaLabel,
    className: btnClass,
    disabled: disabled || loading,
    onClick,
    title,
    type,
  };

  if (typeof href !== 'undefined') {
    return (
      <LinkDuo
        data-test="Button-link"
        role="button"
        to={href}
        {...sharedProps}
      >
        {currentIcon && (
        <FontAwesome
          className="Button__icon"
          data-test="Button-icon"
          name={currentIcon}
          spin={loading}
        />
        )}
        <span className="Button__label">
          {children}
        </span>
      </LinkDuo>
    );
  }

  return (
    <BlurButton
      data-test="Button-button"
      {...sharedProps}
    >
      {currentIcon && (
      <FontAwesome
        className="Button__icon"
        data-test="Button-icon"
        name={currentIcon}
        spin={loading}
      />
      )}
      {children && (
      <span className="Button__label">
        {children}
      </span>
      )}
    </BlurButton>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
