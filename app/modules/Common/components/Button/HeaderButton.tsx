import { makeStyles } from '@mui/styles';
import React, { MouseEventHandler } from 'react';
import FontAwesome from 'react-fontawesome';

import { LibroTheme } from '../../../../themes/themes';
import LDLink from '../LDLink';
import { normalizeTarget } from '../Link';

const BACKGROUND_GRAY_TINT_HOVER = 200;
const SPACING = 1;
const HORIZONTAL_SPACING = 2;

interface HeaderButton {
  anchorRef?: React.RefObject<HTMLButtonElement>;
  icon?: string;
  target?: string;
  title: string;
  loading?: boolean;
  onClick?: MouseEventHandler<Element>;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  button: {
    '&:hover': {
      backgroundColor: theme.palette.grey[BACKGROUND_GRAY_TINT_HOVER],
    },
    alignItems: 'center',
    border: `1px solid ${theme.palette.grey.xLight}`,
    borderRadius: theme.shape.borderRadius,
    display: 'inline-flex',
    gap: theme.spacing(SPACING),
    padding: theme.spacing(SPACING),
    paddingInline: theme.spacing(HORIZONTAL_SPACING),
    transition: '100ms',
  },
  icon: {
    color: theme.palette.grey.light,
    fontSize: '1.2rem !important',
  },
  text: {
    color: theme.palette.grey.main,
    paddingBottom: '2px',
  },
}));

const HeaderButton = ({
  anchorRef,
  icon,
  target,
  title,
  loading,
  onClick,
}: HeaderButton): JSX.Element => {
  const classNames = useStyles();

  return (
    <LDLink
      className={classNames.button}
      disabled={loading}
      ref={anchorRef}
      target={normalizeTarget(target)}
      title={title}
      onClick={onClick}
    >
      {icon && (
        <FontAwesome
          className={classNames.icon}
          name={icon}
          spin={loading}
        />
      )}
      <span className={classNames.text}>
        {title}
      </span>
    </LDLink>
  );
};

export default HeaderButton;
