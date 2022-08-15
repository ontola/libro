import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { TopologyFC } from '../../../Kernel/lib/topology';
import { hoverBoxTopology } from '../index';

import { HoverBoxTrigger } from './HoverBoxTrigger';

export interface HoverBoxProps {
  /** Only show when hovering over the trigger / children */
  hiddenChildren: JSX.Element,
  onClick?: () => void,
  popout?: boolean;
  shine?: boolean;
}

const useStyles = makeStyles<LibroTheme>((theme) => {
  const boxPadding = '10px';
  const boxInset = `calc(${boxPadding} * -1)`;

  return {
    '@keyframes hb-highlight': {
      '0%': {
        boxShadow: 'none',
      },

      '50%': {
        animationTimingFunction: 'ease-in',
        boxShadow: `0 0 1em ${theme.palette.green.light}`,
      },

      '100%': {
        animationTimingFunction: 'ease-out',
        boxShadow: 'none',
      },
    },
    hiddenPart: {
      '@media (hover: none)': {
        pointerEvents: 'auto',
      },
      display: 'none',
      pointerEvents: 'none',
    },
    hoverBox: {
      display: 'block',
      position: 'relative',
    },
    popout: {
      right: 'auto',
      width: '20em',
    },
    shine: {
      animation: '$hb-highlight 1s 1',
    },
    visible: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.boxShadow.intense,
      display: 'block',
      left: boxInset,
      padding: boxPadding,
      position: 'absolute',
      right: boxInset,
      top: boxInset,
      zIndex: theme.zIndexHoverBox,
    },
  };
});

/**
 * Mouse-first component designed to add some extra info where requested. Since it uses 'hover'
 * state, make sure to add functionality for touch users.
 */
const HoverBox: TopologyFC<HoverBoxProps> = ({
  children,
  hiddenChildren,
  onClick,
  popout,
  shine,
}) => {
  const [HoverBoxTopology] = useTopologyProvider(hoverBoxTopology);
  const classes = useStyles();

  const [active, setActive] = React.useState(false);
  const hoverCapable = useMediaQuery('(hover: hover)');
  const shouldShow = active && hoverCapable;

  const showContent = React.useCallback(() => {
    setActive(true);
  }, [setActive]);

  const hideContent = React.useCallback(() => {
    setActive(false);
  }, [setActive]);

  return (
    <HoverBoxTopology>
      <div
        className={clsx({
          [classes.hoverBox]: true,
          [classes.shine]: shine,
        })}
        data-testid="HoverBox"
      >
        <HoverBoxTrigger
          onClick={onClick}
          onHide={hideContent}
          onShow={showContent}
        >
          {children}
        </HoverBoxTrigger>
        <div
          className={clsx({
            [classes.hiddenPart]: true,
            [classes.visible]: shouldShow,
            [classes.popout]: shouldShow && popout,
          })}
        >
          {!popout && children}
          {shouldShow && hiddenChildren}
        </div>
      </div>
    </HoverBoxTopology>
  );
};

export default HoverBox;
