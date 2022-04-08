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
import { LottieRefCurrentProps } from 'lottie-react';

import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';
import {
  StateMachine,
  any,
  useStateMachine,
} from '../../../hooks/useStateMachine';

enum State {
  Loading,
  AnimatingIn,
  AnimatingOut,
  Waiting,
}

enum Action {
  LoadComplete,
  AnimationComplete,
  Alarm,
}

const stateMachine: StateMachine<State, Action> = [
  [any, Action.LoadComplete, State.AnimatingIn],
  [any, Action.AnimationComplete, State.Waiting],
  [State.AnimatingOut, Action.AnimationComplete, State.Loading],
  [State.Waiting, Action.Alarm, State.AnimatingOut],
];

const nextIndex = (index: number, list: unknown[]) => (index + 1) % list.length;

const AnimatedCarousel: FC = () => {
  const items = useIds(array(as.items));
  const [duration] = useNumbers(schema.duration);

  const lottieRef = React.useRef<LottieRefCurrentProps>(null);

  const [state, dispatch] = useStateMachine(stateMachine, State.Loading);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onComplete = React.useCallback(() => {
    dispatch(Action.AnimationComplete);
  }, [dispatch]);

  const onDataReady = React.useCallback(() => {
    dispatch(Action.LoadComplete);
  }, [dispatch]);

  React.useEffect(() => {
    const startAnimation = (direction: 1 | -1) => {
      if (!lottieRef.current) return;

      lottieRef.current.setDirection(direction);
      lottieRef.current.play();
    };

    switch (state.raw) {
    case State.AnimatingIn:
      startAnimation(1);
      break;
    case State.AnimatingOut:
      startAnimation(-1);
      break;
    case State.Loading:
      setCurrentIndex((index) => nextIndex(index, items));
      break;
      
    case State.Waiting: {
      const timeout = setTimeout(() => dispatch(Action.Alarm), duration);

      return () => clearTimeout(timeout);
    }
    }

    return;
  }, [state, duration, lottieRef, items]);

  return (
    <div>
      <Resource
        autoplay={false}
        loop={false}
        lottieRef={lottieRef}
        subject={items[currentIndex]}
        onComplete={onComplete}
        onDataReady={onDataReady}
      />
    </div>
  );
};

AnimatedCarousel.type = sales.AnimatedCarousel;
AnimatedCarousel.topology = allTopologies;

export default register(AnimatedCarousel);
