import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

export interface FlowAnimationProps {
  currentIndex: number;
  componentIndex: number;
  isPhone: boolean;
  children: React.ReactElement;
}

type Direction = 'up' | 'down' | 'left' | 'right';

const getDirection = (
  forward: boolean,
  trigger: 'in' | 'out',
  isPhone: boolean,
): Direction => {
  const dirEnd = isPhone ? 'right' : 'down';
  const dirStart = isPhone ? 'left' : 'up';

  if (trigger === 'in') {
    return forward ? dirStart : dirEnd;
  }

  return !forward ? dirStart : dirEnd;
};

export const FlowAnimation = ({
  currentIndex,
  componentIndex,
  children,
  isPhone,
}: FlowAnimationProps): JSX.Element => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const [shown, setShown] = React.useState(false);
  const [lastIndex, setLastIndex] = React.useState(currentIndex);
  const [direction, setDirection] = React.useState<Direction>();

  React.useEffect(() => {
    const willShow = currentIndex === componentIndex;

    setDirection(getDirection(currentIndex > lastIndex, willShow ? 'in' : 'out', isPhone));
    setLastIndex(currentIndex);
    setShown(willShow);
  }, [currentIndex, componentIndex]);

  const AnimationComponent = prefersReducedMotion ? Fade : Slide;

  return (
    <AnimationComponent
      direction={direction}
      in={shown}
    >
      {children}
    </AnimationComponent>
  );
};
