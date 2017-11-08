import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import PersonContainer from 'containers/PersonContainer';

import {
  CardHeader,
  CardRow,
} from '../Card';
import DetailDate from '../DetailDate';
import DetailsBar from '../DetailsBar';
import DetailStatus from '../DetailStatus';
import DetailVotedFor from '../DetailVotedFor';
import Heading from '../Heading';

const propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  creator: PropTypes.string,
  link: PropTypes.string.isRequired,
  side: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string.isRequired,
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
        {status && <DetailStatus icon="clock-o" status={status} />}
        {side && <DetailVotedFor icon="clock-o" side={side} />}
        <DetailDate date={createdAt} />
      </DetailsBar>
    </CardHeader>
  </CardRow>
);

MotionListItem.propTypes = propTypes;

export default MotionListItem;
