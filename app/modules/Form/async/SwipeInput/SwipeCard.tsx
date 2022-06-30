import {
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { animated } from '@react-spring/web';
import clsx from 'clsx';
import React from 'react';

import { BreakPoints, LibroTheme } from '../../../../themes/themes';
import { Dispatcher, State } from '../../../Common/hooks/useStateMachine';
import { mapRange } from '../../../Common/lib/numbers';

import { CardAction, CardState } from './CardState';
import { useSwipeAnimations } from './hooks/useSwipeAnimations';
import { SwipeCardMedia } from './SwipeCardMedia';
import { SwipeCardOverlay } from './SwipeCardOverlay';
import { SWIPE_CONFIG } from './SwipeConfig';
import { SwipeTutorial } from './SwipeTutorial';

export interface SwipeCardProps {
  image?: string;
  cardState: State<CardState>;
  description: string;
  dispatch: Dispatcher<CardAction>;
  label: React.ReactNode;
}

const {
  cardScaleAmount,
  shadowModifierMin,
  shadowModifierMax,
  shadowAlphaMin,
  shadowAlphaMax,
} = SWIPE_CONFIG;

const cardMinScale = 1 - cardScaleAmount;
const cardMaxScale = 1 + cardScaleAmount;

const mapShadowModifier = mapRange(cardMinScale, cardMaxScale, shadowModifierMin, shadowModifierMax);
const mapShadowAlpha = mapRange(cardMinScale, cardMaxScale, shadowAlphaMax, shadowAlphaMin);

const calcShadow = (scale = 1) => {
  const m = mapShadowModifier(scale);
  const a = mapShadowAlpha(scale);

  /* eslint-disable @typescript-eslint/no-magic-numbers */
  return `
0px ${m * 2.8}px ${m * 2.2}px rgba(0, 0, 0, ${a * 0.017}),
0px ${m * 6.7}px ${m * 5.3}px rgba(0, 0, 0, ${a * 0.024}),
0px ${m * 12.5}px ${m * 10}px rgba(0, 0, 0, ${a * 0.03}),
0px ${m * 22.3}px ${m * 17.9}px rgba(0, 0, 0, ${a * 0.036}),
0px ${m * 41.8}px ${m * 33.4}px rgba(0, 0, 0, ${a * 0.043}),
0px ${m * 100}px ${m * 80}px rgba(0, 0, 0, ${a * 0.06})`;
  /* eslint-enable @typescript-eslint/no-magic-numbers */
};

const dontCullBackfaceStates = [
  CardState.ShowInfoFace,
  CardState.FlipToFront,
];

const useStyles = makeStyles<LibroTheme, Partial<SwipeCardProps>>((theme) => ({
  animatedCardDiv: {
    position: 'absolute',
    top: -20,
    width: 'min(75vw, 25rem)',
  },
  backFaceContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    position: 'relative',
    transform: ({ image }) => image ? 'rotateY(180deg)' : '',
  },
  card: {
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 150ms ease',
    userSelect: 'none',
    width: 'min(75vw, 25rem)',
  },
  cardDragging: {
    cursor: 'grabbing',
  },
  cardHeight: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      height: 'min(20rem, 80vh)',
    },
    [theme.breakpoints.down(BreakPoints.Small)]: {
      height: 'min(15rem, 80vh)',
    },
    height: 'min(30rem, 80vh)',
  },
  clickThrough: {
    pointerEvents: 'none',
  },
  description: {
    flexGrow: 1,
    overflow: 'auto',
  },
  grabable: {
    cursor: 'grab',
    touchAction: 'none',
  },
  title: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      fontSize: '1rem',
      padding: 0,
    },
    fontSize: '1.2rem',
    fontWeight: theme.typography.fontWeightMedium,
    padding: '.5rem',
    textAlign: 'center',
  },
}));

export const SwipeCard = ({
  cardState,
  description,
  dispatch,
  image,
  label,
}: React.PropsWithChildren<SwipeCardProps>): JSX.Element => {
  const classes = useStyles({ image });

  const {
    bind,
    cardProps,
    iconProps,
    isDragging,
    overlayProps,
    side,
  } = useSwipeAnimations(
    cardState,
    dispatch,
  );

  const cardClass = clsx({
    [classes.card]: true,
    [classes.cardHeight]: true,
    [classes.cardDragging]: isDragging,
  });

  const animatedCardFrontClass = clsx({
    [classes.animatedCardDiv]: true,
    [classes.cardHeight]: true,
    [classes.grabable]: !cardState.is(CardState.ShowInfoFace),
    [classes.clickThrough]: cardState.is(CardState.ShowInfoFace),
  });

  const animatedCardBackClass = clsx({
    [classes.animatedCardDiv]: true,
    [classes.cardHeight]: true,
    [classes.grabable]: !image,
  });

  const onlyShowBack = !image;

  return (
    <React.Fragment>
      {(onlyShowBack || cardState.isAny(...dontCullBackfaceStates)) && (
        <animated.div
          {...(onlyShowBack ? bind() : {})}
          className={animatedCardBackClass}
          style={{
            ...cardProps,
            boxShadow: cardProps.scale.to(calcShadow),
            opacity: onlyShowBack ? cardProps.opacity : cardProps.opacity.to((o) => 1 - o),
          }}
        >
          <Card className={cardClass}>
            <SwipeTutorial cardState={cardState} />
            <CardContent className={clsx(classes.backFaceContent, classes.cardHeight)}>
              {label && (
                <React.Fragment>
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    {label}
                  </Typography>
                  <Divider />
                </React.Fragment>
              )}
              <Typography
                className={classes.description}
                variant="body1"
              >
                {description}
              </Typography>
              {onlyShowBack && (
                <SwipeCardOverlay
                  iconProps={iconProps}
                  overlayProps={overlayProps}
                  side={side}
                />
              )}
            </CardContent>
          </Card>
        </animated.div>
      )}
      {!onlyShowBack && (
        <animated.div
          {...(!cardState.is(CardState.ShowInfoFace) ? bind() : {})}
          className={animatedCardFrontClass}
          style={{
            ...cardProps,
            boxShadow: cardProps.scale.to(calcShadow),
          }}
        >
          <Card className={cardClass}>
            <SwipeCardMedia
              src={image}
              tutorial={<SwipeTutorial cardState={cardState} />}
            >
              <SwipeCardOverlay
                blur
                iconProps={iconProps}
                overlayProps={overlayProps}
                side={side}
              />
            </SwipeCardMedia>
            {label && (
              <CardContent>
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  {label}
                </Typography>
              </CardContent>
            )}
          </Card>
        </animated.div>
      )}
    </React.Fragment>
  );
};
