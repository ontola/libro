import PropTypes from 'prop-types';
import React from 'react';
import { FormattedRelativeTime } from 'react-intl';

import { relativeTimeDestructure } from '../../helpers/date';

const RelativeDate = ({ date }) => {
  if (!date) {
    return null;
  }

  return (
    <FormattedRelativeTime {...relativeTimeDestructure(date)} />
  );
};

RelativeDate.propTypes = {
  date: PropTypes.instanceOf(Date),
};

export default RelativeDate;
