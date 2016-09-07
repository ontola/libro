import moment from 'moment';

const dateDisplayFormat = 'DD-MM-YYYY';

/**
 * @param {number} timestamp A unix timestamp
 * @param {string} format A format to display date
 * @return {string} A formatted date string
 */
const formatDate = (
  timestamp,
  format
) => {
  if (!timestamp) {
    return undefined;
  }

  const dateMilliSeconds = new Date(timestamp);
  const formattedDate = moment(dateMilliSeconds).format(format || dateDisplayFormat);
  return formattedDate;
};

export {
  formatDate,
};
