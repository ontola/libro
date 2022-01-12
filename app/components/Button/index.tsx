import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/styles';
import { NamedNode } from '@ontologies/core';
import clsx from 'clsx';
import { useLRS } from 'link-redux';
import React, { MouseEvent } from 'react';
import FontAwesome from 'react-fontawesome';

import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import { LibroTheme } from '../../themes/themes';
import BlurButton from '../BlurButton';
import LinkDuo from '../LinkDuo';

import useStyles, {
  ButtonTheme,
  ButtonVariant,
} from './buttonStyles';

export { ButtonTheme, ButtonVariant } from './buttonStyles';

export const ButtonLabelIdentifierClass = 'Button__label';
const ButtonIdentifierClass = 'Button';
const ButtonIconIdentifierClass = 'Button__icon';

export interface ButtonProps {
  action?: NamedNode,
  /** Should be true when the button is toggleable and toggled. */
  active?: boolean;
  /** Additional aria label */
  ariaLabel?: string;
  list?: boolean;
  cardFloat?: boolean;
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
  stretch?: boolean;
  /** Removes all styling. */
  theme?: ButtonTheme;
  /** Title html tag. */
  title?: string;
  type?: string;
  variant?: ButtonVariant;
}

const defaultProps = {
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
const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
  active,
  action,
  ariaLabel,
  cardFloat,
  list,
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
  stretch,
  narrow,
  plain,
  theme,
  title,
  type,
  href,
  variant,
  ...otherProps
}, ref) => {
  const lrs = useLRS();
  const muiTheme = useTheme<LibroTheme>();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const classes = useStyles();
  const handleAction = React.useCallback((e: MouseEvent) => {
    e.preventDefault();

    return lrs.exec(action!);
  }, [action]);
  const handleClick = onClick || (action ? handleAction : undefined);
  const btnClass = clsx({
    [ButtonIdentifierClass]: true,
    [classes.button]: true,
    [classes.buttonPlain]: plain,
    [classes.active]: active,
    [classes.centered]: centered,
    [classes.corner]: corner,
    [classes.grow]: grow,
    [classes.hasChildren]: children,
    [classes.hasIcon]: icon,
    [classes.margins]: margins,
    [classes.narrow]: narrow,
    [classes.small]: small,
    [classes.cardList]: list,
    [classes.cardFloat]: cardFloat,
    [classes.stretched]: stretch,
    [classes[theme ?? '']]: theme,
    [classes[variant ?? '']]: variant,
    [className || '']: className,
  });

  const buttonLabelClass = clsx([
    ButtonLabelIdentifierClass,
    classes.label,
  ]);

  const buttonIconClass = clsx([
    ButtonIconIdentifierClass,
    classes.icon,
  ]);

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
        {...otherProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {currentIcon && (
          <FontAwesome
            className={buttonIconClass}
            data-test="Button-icon"
            name={currentIcon}
            spin={loading}
          />
        )}
        <span className={buttonLabelClass}>
          {children}
        </span>
        {endIcon}
      </LinkDuo>
    );
  }

  return (
    <BlurButton
      aria-pressed={active}
      data-test="Button-button"
      ref={ref as React.Ref<HTMLButtonElement>}
      {...sharedProps}
      {...otherProps}
    >
      {currentIcon && (
        <FontAwesome
          className={buttonIconClass}
          data-test="Button-icon"
          data-testid="Button-icon"
          name={currentIcon}
          spin={loading}
        />
      )}
      {children && (!icon || !isMobile) && (
        <span className={buttonLabelClass}>
          {children}
        </span>
      )}
      {endIcon}
    </BlurButton>
  );
});

Button.defaultProps = defaultProps;
Button.displayName = 'Button';

export default Button;
