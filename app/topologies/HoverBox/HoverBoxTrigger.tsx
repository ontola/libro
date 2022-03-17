import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

export interface HoverBoxTriggerProps {
  onShow: () => void;
  onHide: () => void;
  onClick?: () => void;
}

const useStyles = makeStyles({
  hoverBox: {
    display: 'block',
    position: 'relative',
  },
  trigger: {
    '&:focus': {
      outline: 'none',
    },

    display: 'block',
  },
});

export const HoverBoxTrigger: React.FC<HoverBoxTriggerProps> = ({
  children,
  onClick,
  onHide,
  onShow,
}) => {
  const classes = useStyles();

  return (
    <span
      className={clsx(
        classes.hoverBox,
        classes.trigger,
      )}
      data-testid="HoverBox-trigger"
      tabIndex={0}
      onBlur={onHide}
      onClick={onClick}
      onFocus={onShow}
      onKeyUp={onClick}
      onMouseEnter={onShow}
      onMouseLeave={onHide}
    >
      {children}
    </span>
  );
};
