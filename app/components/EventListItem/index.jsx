import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import path from 'helpers/paths';

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
  id: PropTypes.string.isRequired,
};

const EventListItem = ({
  title,
  startDate,
  id,
}) => (
  <CardRow>
    <CardHeader>
      <Heading size="3">
        <Link to={path.event(id)}>{title}</Link>
      </Heading>
      <DetailsBar>
        <DetailDate date={startDate} />
      </DetailsBar>
    </CardHeader>
  </CardRow>
);

EventListItem.propTypes = propTypes;

export default EventListItem;
