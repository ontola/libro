import {
  FC,
  Resource,
  array,
  register,
  useIds,
  useNumbers,
} from 'link-redux';
import React from 'react';
import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import type { LottieRefCurrentProps } from 'lottie-react';

import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';
import {
  StateMachine,
  any,
  useStateMachine,
} from '../../../hooks/useStateMachine';

enum State {
  LoadingAnimation,
  AnimatingIn,
  AnimatingOut,
  Waiting,
}

enum Action {
  LoadComplete,
  AnimationComplete,
  Alarm,
}

const RETRY_FREQUENCY = 10;

const timeout = (fn: () => void, ms: number): () => void => {
  const id = setTimeout(fn, ms);

  return () => clearTimeout(id);
};

const startAnimation = (controller: LottieRefCurrentProps, direction: 1 | -1) => {
  controller.setDirection(direction);
  controller.play();
};

const stateMachine: StateMachine<State, Action> = [
  [State.LoadingAnimation, Action.LoadComplete, State.AnimatingIn],
  [any, Action.AnimationComplete, State.Waiting],
  [State.AnimatingOut, Action.AnimationComplete, State.LoadingAnimation],
  [State.Waiting, Action.Alarm, State.AnimatingOut],
];

const AnimatedCarousel: FC = () => {
  const items = useIds(array(as.items));
  const [duration] = useNumbers(schema.duration);
  const [state, dispatch] = useStateMachine(stateMachine, State.LoadingAnimation);

  const [update, setUpdate] = React.useState(0);

  const controller = React.useRef<LottieRefCurrentProps>(null);

  const [currentIndex, nextIndex] = React.useReducer((index) => (index + 1) % items.length, 0);

  const onComplete = React.useCallback(() => {
    dispatch(Action.AnimationComplete);
  }, [dispatch]);

  const onDataReady = React.useCallback(() => {
    dispatch(Action.LoadComplete);
  }, [dispatch]);

  React.useEffect(() => {
    if (!controller.current) {
      // HACK: Callback refs don't work with Lottie-React so we have to wait until the ref is set.
      return timeout(() => {
        setUpdate((num) => num + 1);
      }, RETRY_FREQUENCY);
    }

    switch (state.raw) {
    case State.AnimatingIn:
      startAnimation(controller.current, 1);
      break;
    case State.AnimatingOut:
      startAnimation(controller.current, -1);
      break;
    case State.LoadingAnimation:
      nextIndex();
      break;
    case State.Waiting:
      return timeout(() => dispatch(Action.Alarm), duration);
    }

    return;
  }, [state, duration, update]);

  return (
    <Resource
      autoplay={false}
      loop={false}
      lottieRef={controller}
      subject={items[currentIndex]}
      onComplete={onComplete}
      onDataReady={onDataReady}
    />
  );
};

AnimatedCarousel.type = sales.AnimatedCarousel;
AnimatedCarousel.topology = allTopologies;

export default register(AnimatedCarousel);
