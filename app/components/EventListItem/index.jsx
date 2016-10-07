import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  CardRow,
  CardHeader,
  DetailDate,
  DetailsBar,
  Heading,
} from 'components';

const propTypes = {
  title: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date),
  link: PropTypes.string.isRequired,
};

const EventListItem = ({
  title,
  startDate,
  link,
}) => (
  <CardRow>
    <CardHeader>
      <Heading size="3">
        <Link to={link}>{title}</Link>
      </Heading>
      <DetailsBar>
        <DetailDate date={startDate} />
      </DetailsBar>
    </CardHeader>
  </CardRow>
);

EventListItem.propTypes = propTypes;

export default EventListItem;
