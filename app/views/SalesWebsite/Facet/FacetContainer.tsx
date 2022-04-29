import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  array,
  useIds,
  useResourceLinks,
  useStrings,
} from 'link-redux';
import type { LottieRefCurrentProps } from 'lottie-react';
import React from 'react';

import { Facet, FacetType } from '../../../components/SalesWebsite/Facet';
import type { ResourceLink } from '../../../helpers/link-redux/types';
import { tryParseInt } from '../../../helpers/numbers';
import { timeoutEffect } from '../../../helpers/timeoutEffect';
import {
  StateMachine,
  any,
  useStateMachine,
} from '../../../hooks/useStateMachine';
import sales from '../../../ontology/sales';
import { LibroTheme, Margin } from '../../../themes/themes';
import { containerTopology } from '../../../topologies';

type Direction = 'forward' | 'reverse';

enum State {
  LoadingAnimation,
  AnimatingIn,
  Waiting,
  AnimatingOut,
}

enum Action {
  LoadComplete,
  AnimationComplete,
  ClickAway,
}

interface StyleProps {
  direction: Direction;
}

const DOUBLE_SPEED = 2;
const REVERSE = -1;
const SMALL_SCREEN_TITLE_MARGIN = 15;
const RETRY_FREQUENCY = 100;

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  animation: {
    gridArea: 'animation',
  },
  list: {
    gridArea: 'list',
  },
  subTitle: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.fontSizes.xxLarge,
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: 1.4,
    margin: 0,
    maxWidth: '30ch',
  },
  title: {
    fontSize: theme.typography.fontSizes.xLarge,
    fontWeight: theme.typography.fontWeightBold,
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(SMALL_SCREEN_TITLE_MARGIN),
    },
  },
  titleWrapper: {
    gridArea: 'title',
  },
  video: {
    '@supports not (backdrop-filter: blur(10px))': {
      backgroundColor: 'rgb(231, 231, 231)',
    },
    aspectRatio: '16 / 10',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgb(231, 231, 231, 57%)',
    borderRadius: '15px',
    borderWidth: '8px',
    boxShadow: '0px 3px 12px 0px rgb(0 0 0 / 22%)',
    height: 'auto',
    objectFit: 'contain',
    padding: '10px',
    position: 'relative',
    width: '100%',
    zIndex: 2,
  },
  wrapper: {
    display: 'grid',
    gap: theme.spacing(Margin.Large),
    gridTemplateAreas: ({ direction }) => direction === 'forward'
      ? '"title title" "list animation"'
      : '"title title" "animation list"',
    gridTemplateColumns: ({ direction }) => direction === 'forward'
      ? '2fr 3fr'
      : '3fr 2fr',
    marginBottom: theme.spacing(Margin.XXL),
    [theme.breakpoints.down('md')]: {
      '&&': {
        gap: theme.spacing(Margin.Small),
        gridTemplateAreas: '"title" "animation" "list"',
        gridTemplateColumns: '1fr',
      },
    },
  },
}));

const facetProps = {
  image: schema.image,
  name: schema.name,
  text: schema.text,
};

const animationProps = {
  animationLength: sales.animationLength,
  animationSplit: sales.animationSplit,
};

const stateMachine: StateMachine<State, Action> = [
  [any, Action.LoadComplete, State.AnimatingIn],
  [State.AnimatingIn, Action.AnimationComplete, State.Waiting],
  [State.AnimatingOut, Action.AnimationComplete, State.LoadingAnimation],
  [any, Action.ClickAway, State.AnimatingOut],
];

const resetAnimationParams = (controller: LottieRefCurrentProps) => {
  controller.setSpeed(1);
  controller.setDirection(1);
};

const animateIn = (controller: LottieRefCurrentProps, animationMeta?: ResourceLink<typeof animationProps>) => {
  resetAnimationParams(controller);

  if (animationMeta?.animationSplit === undefined) {
    controller.play();

    return;
  }

  const splitFrame =
    tryParseInt(animationMeta.animationSplit?.value) ??
    controller.getDuration(true) ??
    0;

  controller.playSegments([0, splitFrame], true);
};

const animateOut = (controller: LottieRefCurrentProps, animationMeta?: ResourceLink<typeof animationProps>) => {
  if (animationMeta?.animationSplit === undefined || animationMeta.animationLength === undefined) {
    controller.setDirection(REVERSE);
    controller.setSpeed(DOUBLE_SPEED);
    controller.play();

    return;
  }

  resetAnimationParams(controller);

  const splitFrame = tryParseInt(animationMeta.animationSplit) ?? 0;
  const lastFrame = tryParseInt(animationMeta.animationLength) ?? 0;

  controller.playSegments([splitFrame, lastFrame], true);
};

const FacetContainer: FC = () => {
  const [direction] = useStrings(sales.flexDirection) as Direction[];
  const [name] = useStrings(schema.name);
  const [text] = useStrings(schema.text);
  const members = useIds(array(as.items));
  const facets = useResourceLinks(members, facetProps);
  const classes = useStyles({
    direction,
  });

  const lottieController = React.useRef<LottieRefCurrentProps>(null);

  const [currentFacet, setCurrentFacet] = React.useState<FacetType>(facets[0]);

  const [animation, setAnimation] = React.useState(facets[0].image);
  const [animationMeta] = useResourceLinks([animation] as SomeNode[], animationProps);

  const [updateTrigger, update] = React.useReducer((state: number) => state + 1, 0);

  const [animationState, dispatch] = useStateMachine(stateMachine, State.LoadingAnimation);

  const onDataReady = React.useCallback(() => {
    dispatch(Action.LoadComplete);
  }, [dispatch]);

  const onAnimationComplete = React.useCallback(() => {
    dispatch(Action.AnimationComplete);
  }, [dispatch]);

  React.useEffect(() => {
    if (currentFacet) {
      dispatch(Action.ClickAway);
    }
  }, [currentFacet]);

  React.useEffect(() => {
    if (!lottieController.current) {
      return timeoutEffect(update, RETRY_FREQUENCY);
    }

    switch (animationState.raw) {
    case State.LoadingAnimation:
      setAnimation(currentFacet.image);
      break;
    case State.AnimatingIn:
      animateIn(lottieController.current, animationMeta);
      break;
    case State.AnimatingOut:
      animateOut(lottieController.current, animationMeta);
      break;
    }

    return;
  }, [animationState, updateTrigger]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.titleWrapper}>
        <Typography
          className={classes.title}
          variant="h2"
        >
          {name}
        </Typography>
        <Typography
          className={classes.subTitle}
          component="p"
          variant="subtitle1"
        >
          {text}
        </Typography>
      </div>
      <div
        className={classes.list}
      >
        {facets.map((facet) => (
          <Facet
            current={facet.subject === currentFacet.subject}
            facet={facet}
            key={facet.subject?.value}
            onClick={setCurrentFacet}
          />
        ))}
      </div>
      <div
        className={classes.animation}
      >
        {animation && (
          <Resource
            muted
            playsInline
            autoplay={false}
            loop={false}
            lottieRef={lottieController}
            subject={animation}
            width="100%"
            onComplete={onAnimationComplete}
            onDataReady={onDataReady}
          />
        )}
      </div>
    </div>
  );
};

FacetContainer.type = sales.Facet;

FacetContainer.topology = containerTopology;

export default FacetContainer;
