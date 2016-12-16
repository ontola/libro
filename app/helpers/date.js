import moment from 'moment';
import 'moment-duration-format';

// This is not working for some reason
// moment.locale('nl')
require('moment/locale/nl');

/**
 * @param {number} timestamp A unix timestamp
 * @param {string} format A format to display date
 * @return {string} A formatted date string
 */
const formatDate = (
  timestamp,
  format = 'lll'
) => {
  if (!timestamp) {
    return undefined;
  }

  const dateMilliSeconds = new Date(timestamp);
  const formattedDate = moment(dateMilliSeconds).format(format);
  return formattedDate;
};

/**
 * @param {number} milliSeconds - Accepts milliSeconds
 * @return {string} A formatted time string
 */
const durationToString = milliSeconds =>
  moment.duration(milliSeconds, 'milliSeconds').format('h:mm:ss');

/**
 * @param {number} milliSeconds - Accepts milliSeconds
 * @return {string} A formatted time string
 */
const durationToHumanizedString = milliSeconds =>
  moment.duration(milliSeconds, 'milliSeconds').humanize();

/**
 * @param {number} milliSeconds - Accepts milliSeconds
 * @return {string} A formatted time string
 */
const formatDateFromNow = milliSeconds => moment(milliSeconds).fromNow();


export {
  durationToString,
  durationToHumanizedString,
  formatDate,
  formatDateFromNow,
};
