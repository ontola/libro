import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import PersonContainer from 'containers/PersonContainer';

import {
  CardRow,
  CardHeader,
} from '../Card';
import DetailDate from '../DetailDate';
import DetailsBar from '../DetailsBar';
import DetailStatus from '../DetailStatus';
import DetailVotedFor from '../DetailVotedFor';
import Heading from '../Heading';

const propTypes = {
  title: PropTypes.string.isRequired,
  creator: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  link: PropTypes.string.isRequired,
  side: PropTypes.string,
  status: PropTypes.string,
};

const MotionListItem = ({
  title,
  creator,
  createdAt,
  link,
  side,
  status,
}) => (
  <CardRow>
    <CardHeader>
      <Heading size="3">
        <Link to={link}>{title}</Link>
      </Heading>
      <DetailsBar>
        {creator && <PersonContainer user={creator} />}
        {status && <DetailStatus status={status} icon="clock-o" />}
        {side && <DetailVotedFor side={side} icon="clock-o" />}
        <DetailDate date={createdAt} />
      </DetailsBar>
    </CardHeader>
  </CardRow>
);

MotionListItem.propTypes = propTypes;

export default MotionListItem;
