import { NamedNode } from '@ontologies/core';
import clsx from 'clsx';
import { useLRS } from 'link-redux';
import React, { MouseEvent } from 'react';
import FontAwesome from 'react-fontawesome';

import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import BlurButton from '../BlurButton';
import LinkDuo from '../LinkDuo';

import './Button.scss';

export enum ButtonTheme {
  AsCard = 'as-card',
  Box = 'box',
  CardBig = 'card--big',
  Default = 'default',
  Pagination = 'pagination',
  Submit = 'submit',
  Subtle = 'subtle',
  Transparent = 'transparent',
}

export enum ButtonVariant {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Yes = 'yes',
  Pro = 'pro',
  Neutral = 'neutral',
  Other = 'other',
  No = 'no',
  Con = 'con',
  Upvote = 'upvote',
  Comment = 'comment',
  Facebook = 'facebook',
  Google = 'google',
}

export interface ButtonProps {
  action?: NamedNode,
  /** Should be true when the button is toggleable and toggled. */
  active?: boolean;
  /** Additional aria label */
  ariaLabel?: string;
  centered?: boolean;
  /** Label of the button */
  children?: React.ReactNode;
  /** Should be avoided. Try to use the 'theme' prop or wrap it in some other element for styling */
  /** and use the 'plain' prop. */
  className?: string;
  /** Displays button on top right position of relative parent */
  corner?: boolean;
  disabled?: boolean;
  /** FontAwesome icon string. */
  endIcon?: React.ReactNode;
  /** Whether the button should fill it's container */
  grow?: boolean;
  /** If the button is actually just a link */
  href?: string;
  /** FontAwesome icon string. */
  icon?: string;
  /** Set to true if the button should indicate that something is happening. Renders spinner. */
  loading?: boolean;
  /** Give some margins for inline usage */
  margins?: boolean;
  narrow?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Removes all styling. */
  plain?: boolean;
  small?: boolean;
  /** Removes all styling. */
  theme?: ButtonTheme;
  /** Title html tag. */
  title?: string;
  type?: string;
  variant?: ButtonVariant;
}

const defaultProps = {
  active: false,
  corner: false,
  grow: false,
  narrow: false,
  plain: false,
  small: false,
  theme: ButtonTheme.Default,
  type: 'button',
};

/**
 * Used for any action in the app. Handles touch events and blurs after handling the onClick.
 * @returns {component} Component
 */
const Button: React.FC<ButtonProps> = ({
  active,
  action,
  ariaLabel,
  centered,
  children,
  className,
  corner,
  disabled,
  endIcon,
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
  const lrs = useLRS();
  const handleAction = React.useCallback((e: MouseEvent) => {
    e.preventDefault();

    return lrs.exec(action!);
  }, [action]);
  const handleClick = onClick || (action ? handleAction : undefined);
  const btnClass = clsx({
    'Button': true,
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
    [className || '']: className,
  });

  const currentIcon = loading ? 'spinner' : icon && normalizeFontAwesomeIRI(icon);

  const sharedProps = {
    'aria-label': ariaLabel,
    'className': btnClass,
    'disabled': disabled || loading,
    onClick: handleClick,
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
            data-testid="Button-icon"
            name={currentIcon}
            spin={loading}
          />
        )}
        <span className="Button__label">
          {children}
        </span>
        {endIcon}
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
          data-testid="Button-icon"
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

Button.defaultProps = defaultProps;

export default Button;
