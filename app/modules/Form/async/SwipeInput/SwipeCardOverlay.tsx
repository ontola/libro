import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { makeStyles } from '@mui/styles';
import { animated } from '@react-spring/web';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';

import { HoverSide } from './CardState';
import { IconAnimationProps, OverlayAnimationProps } from './hooks/Animator';
import { SWIPE_CONFIG } from './SwipeConfig';

export interface SwipeCardOverlayProps {
  blur?: boolean;
  overlayProps: OverlayAnimationProps;
  iconProps: IconAnimationProps;
  side: HoverSide;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  icon: {
    color: theme.palette.common.white,
    fontSize: '8rem',
  },
  iconOverlay: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  mediaOverlay: {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    height: '100%',
    left: 0,
    mixBlendMode: 'hard-light',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
}));

const {
  overlayBackdropBlurModifier,
  iconShadowBlurModifier,
  iconShadowOpacityModifier,
  iconShadowSpreadModifier,
} = SWIPE_CONFIG;

export const SwipeCardOverlay = ({
  blur,
  overlayProps,
  iconProps,
  side,
}: SwipeCardOverlayProps): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <animated.div
        className={classes.mediaOverlay}
        style={{
          ...(
            blur ? {
              backdropFilter: overlayProps.opacity.to((o) => `blur(${o * overlayBackdropBlurModifier}px)`),
            } : {}
          ),
          ...overlayProps,
        }}
      />
      <animated.div
        className={classes.iconOverlay}
        style={{
          filter: iconProps.opacity.to((o) =>
            `drop-shadow(rgba(0 0 0 / ${o * iconShadowOpacityModifier}%) 0px ${o * iconShadowSpreadModifier}px ${o * iconShadowBlurModifier}px)`),
          ...iconProps,
        }}
      >
        {side === HoverSide.No && <ThumbDownIcon className={classes.icon} />}
        {side === HoverSide.Yes && <ThumbUpIcon className={classes.icon} />}
      </animated.div>
    </React.Fragment>
  );
};
