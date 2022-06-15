import { Unit } from '@formatjs/intl-utils/src/diff';

import { tryParseInt } from '../lib/numbers';

import useStoredState from './useStoredState';

const defaultInterval = 30;

const updatableUnits = ['second', 'minute', 'hour'];

export const filterUpdateInterval = (unit: Unit, interval: number) : number | undefined => updatableUnits.includes(unit)
  ? interval
  : undefined;

export const useDateUpdateInterval = (): number => {
  const [interval] = useStoredState(
    'libro.components.RelativeDate.intervalSeconds',
    defaultInterval,
    localStorage,
    tryParseInt,
    (i) => (i ?? defaultInterval).toString(),
  );

  return interval!;
};
