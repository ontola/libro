import moment from 'moment';

/**
 * @constant
 * @type {number}
 */
const MILLISECONDS_TO_SECONDS = 1000;


/**
 * @constant
 * @type {string}
 */
const dateDisplayFormat = 'DD-MM-YY';


/**
 * @param {number} timestamp A unix timestamp
 * @return {string} A formatted date string
 */
const formatDate = (timestamp) => {
  if (!timestamp) {
    return undefined;
  }

  const dateMilliSeconds = new Date(timestamp * MILLISECONDS_TO_SECONDS);
  const formattedDate = moment(dateMilliSeconds).format(dateDisplayFormat);
  return formattedDate;
};

export {
  formatDate,
};
