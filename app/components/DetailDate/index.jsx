import './DetailDate.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';

const propTypes = {
  date: PropTypes.string,
};

const DetailDate = ({
  date,
}) => (
  <Detail
    text={date}
    icon="clock-o"
    title={date}
  />
);

DetailDate.propTypes = propTypes;

export default DetailDate;
