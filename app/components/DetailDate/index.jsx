import './DetailDate.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';
import { formatDate } from 'helpers/date';

const propTypes = {
  date: PropTypes.string,
};

const DetailDate = ({
  date,
 }) =>
  <Detail
    text={formatDate(date)}
    icon="clock-o"
    title={date}
  />;

DetailDate.propTypes = propTypes;

export default DetailDate;
