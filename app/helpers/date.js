const SEC_MS = 1000;
const MINUTE_SECS = 60;
const DAY_HOURS = 24;
const WEEK_DAYS = 7;
const MONTH_DAYS = 30.5;
const YEAR_DAYS = 365.25;

const HOUR_SECS = MINUTE_SECS * MINUTE_SECS;
const DAY_SECS = DAY_HOURS * HOUR_SECS;
const WEEK_SECS = WEEK_DAYS * DAY_SECS;
const MONTH_SECS = MONTH_DAYS * DAY_SECS;
const YEAR_SECS = YEAR_DAYS * DAY_SECS;

export const relativeTimeDestructure = (date, relative = Date.now()) => {
  const seconds = (date - relative) / SEC_MS;
  const oom = Math.abs(seconds);

  if (oom < MINUTE_SECS) {
    return {
      unit: 'seconds',
      value: Math.round(seconds),
    };
  } else if (oom < HOUR_SECS) {
    return {
      unit: 'minutes',
      value: Math.round(seconds / MINUTE_SECS),
    };
  } else if (oom < DAY_SECS) {
    return {
      unit: 'hours',
      value: Math.round(seconds / HOUR_SECS),
    };
  } else if (oom < WEEK_SECS) {
    return {
      unit: 'days',
      value: Math.round(seconds / DAY_SECS),
    };
  } else if (oom < MONTH_SECS) {
    return {
      unit: 'weeks',
      value: Math.round(seconds / WEEK_SECS),
    };
  } else if (oom < YEAR_SECS) {
    return {
      unit: 'months',
      value: Math.round(seconds / MONTH_SECS),
    };
  }

  return {
    unit: 'year',
    value: Math.round(seconds / YEAR_SECS),
  };
};

export default date => ((date && date.termType) ? new Date(date.value) : date) < Date.now();
