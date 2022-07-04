import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSpring } from '@react-spring/web';
import { ReactDOMAttributes, useDrag } from '@use-gesture/react';
import React from 'react';

import { BreakPoints } from '../../../../Kernel/lib/themes';
import { Dispatcher, State } from '../../../../Common/hooks/useStateMachine';
import {
  CardAction,
  CardState,
  HoverSide,
} from '../CardState';
import { SWIPE_CONFIG } from '../SwipeConfig';

import {
  Animator,
  CardAnimationProps,
  IconAnimationProps,
  OverlayAnimationProps,
} from './Animator';

export interface SwipeAnimationsResult {
  bind: (...args: any[]) => ReactDOMAttributes;
  cardProps: CardAnimationProps;
  iconProps: IconAnimationProps;
  overlayProps: OverlayAnimationProps;
  isDragging: boolean;
  side: HoverSide;
}

const {
  confirmVoteThresholdLarge,
  confirmVoteThresholdSmall,
} = SWIPE_CONFIG;

export const useSwipeAnimations = (
  cardState: State<CardState>,
  dispatch: Dispatcher<CardAction>,
): SwipeAnimationsResult => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [side, setSide] = React.useState<HoverSide>(HoverSide.Yes);

  const theme = useTheme();
  const screenIsWide = useMediaQuery(theme.breakpoints.up(BreakPoints.Medium));

  const confirmThreshold = screenIsWide ? confirmVoteThresholdLarge : confirmVoteThresholdSmall;

  const [cardProps, cardAPI] = useSpring(() => ({
    config: Animator.config,
    from: {
      ...Animator.cardBaseProps,
    },
  }));

  const [overlayProps, overlayAPI] = useSpring(() => ({
    config: Animator.config,
    from: {
      ...Animator.overlayBaseProps,
    },
  }));

  const [iconProps, iconAPI] = useSpring(() => ({
    config: Animator.config,
    from: {
      ...Animator.iconBaseProps,
    },
  }));

  const animator = React.useMemo(() => new Animator(
    cardAPI,
    iconAPI,
    overlayAPI,
    screenIsWide,
  ), [cardAPI, iconAPI, overlayAPI, screenIsWide]);

  React.useEffect(() => {
    switch (cardState.raw) {
    case CardState.VotingNo:
    case CardState.VotingYes:
      setSide(cardState.is(CardState.VotingYes) ? HoverSide.Yes : HoverSide.No);
      animator.animateVote(cardState.raw);
      break;
    case CardState.ShowInfoFace:
      animator.animateShowInfo();
      break;
    case CardState.FlipToFront:
      animator.animateFlipToFront().then(() => dispatch(CardAction.FlipDone));
      break;
    case CardState.Idle:
      animator.animateIdle();
      break;
    case CardState.IdleYes:
    case CardState.IdleNo:
      animator.animateVotedIdle(cardState.raw);
      break;
    }
  }, [cardState]);

  const bind = useDrag(async ({
    event,
    down,
    first,
    movement: [mx, my],
  }) => {
    event.preventDefault();

    if (first) {
      dispatch(CardAction.DragStart);
    }

    const hoverSide = mx < 0 ? HoverSide.No : HoverSide.Yes;

    setSide(hoverSide);
    setIsDragging(down);

    const xOffset = Math.abs(mx);

    if (!down && xOffset > confirmThreshold) {
      dispatch(hoverSide === HoverSide.Yes ? CardAction.ReleaseYes : CardAction.ReleaseNo);

      return;
    } else if (!down) {
      dispatch(CardAction.ReleaseMiddle);

      return;
    }

    animator.animateDragging(down, mx, my, hoverSide);
  });

  return {
    bind,
    cardProps,
    iconProps,
    isDragging,
    overlayProps,
    side,
  };
};
