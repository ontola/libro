import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import path from 'helpers/paths';

import {
  CardHeader,
  CardRow,
} from '../Card';
import DetailDate from '../DetailDate';
import DetailsBar from '../DetailsBar';
import Heading from '../Heading';

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
