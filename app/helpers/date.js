import moment from 'moment';

const MILLISECONDS_TO_SECONDS = 1000;
const dateDisplayFormat = 'DD-MM-YY';

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
