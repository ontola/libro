import { Unit as RelativeTimeUnit } from '@formatjs/intl-relativetimeformat';
import { Unit as NumberUnit } from '@formatjs/intl-unified-numberformat';
import { Term, isTerm } from '@ontologies/core';

export const SEC_MS = 1000;
export const MINUTE_SECS = 60;
const DAY_HOURS = 24;
const WEEK_DAYS = 7;
const MONTH_DAYS = 30.5;
const YEAR_DAYS = 365.25;

const HOUR_SECS = MINUTE_SECS * MINUTE_SECS;
const DAY_SECS = DAY_HOURS * HOUR_SECS;
const WEEK_SECS = WEEK_DAYS * DAY_SECS;
const MONTH_SECS = MONTH_DAYS * DAY_SECS;
const YEAR_SECS = YEAR_DAYS * DAY_SECS;

interface RelativeTimeDestructure {
  unit: RelativeTimeUnit & NumberUnit;
  value: number;
}

export const relativeTimeDestructure = (date: number, relative: number = Date.now()): RelativeTimeDestructure => {
  const seconds = (date - relative) / SEC_MS;
  const oom = Math.abs(seconds);

  if (oom < MINUTE_SECS) {
    return {
      unit: 'second',
      value: Math.round(seconds),
    };
  } else if (oom < HOUR_SECS) {
    return {
      unit: 'minute',
      value: Math.round(seconds / MINUTE_SECS),
    };
  } else if (oom < DAY_SECS) {
    return {
      unit: 'hour',
      value: Math.round(seconds / HOUR_SECS),
    };
  } else if (oom < WEEK_SECS) {
    return {
      unit: 'day',
      value: Math.round(seconds / DAY_SECS),
    };
  } else if (oom < MONTH_SECS) {
    return {
      unit: 'week',
      value: Math.round(seconds / WEEK_SECS),
    };
  } else if (oom < YEAR_SECS) {
    return {
      unit: 'month',
      value: Math.round(seconds / MONTH_SECS),
    };
  }

  return {
    unit: 'year',
    value: Math.round(seconds / YEAR_SECS),
  };
};

export default (date: Term | number): boolean => (isTerm(date) ? new Date(date.value).getTime() : date) < Date.now();
