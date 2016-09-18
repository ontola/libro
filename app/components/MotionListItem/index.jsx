import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import PersonContainer from 'containers/PersonContainer';

import {
  CardRow,
  CardHeader,
  DetailDate,
  DetailsBar,
  DetailStatus,
  DetailVotedFor,
  Heading,
} from 'components';

const propTypes = {
  title: PropTypes.string.isRequired,
  creator: PropTypes.string,
  createdAt: PropTypes.string,
  link: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
  side: PropTypes.string,
  status: PropTypes.string,
  voteData: PropTypes.string.isRequired,
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
