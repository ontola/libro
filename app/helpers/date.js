import moment from 'moment';
import 'moment-duration-format';

moment.locale('nl');

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
 * @param {number} seconds Accepts seconds
 * @return {string} A formatted time string
 */
const durationToString = (seconds) => moment.duration(seconds, 'seconds').format('h:mm:ss');

export {
  durationToString,
  formatDate,
};
