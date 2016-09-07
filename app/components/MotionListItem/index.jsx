import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  Card,
  CardActions,
  CardButton,
  CardHeader,
  Detail,
  DetailsBar,
  Heading,
} from 'components';

import PersonContainer from 'containers/PersonContainer';

const propTypes = {
  title: PropTypes.string.isRequired,
  creator: PropTypes.string,
  createdAt: PropTypes.string,
  link: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
  voteData: PropTypes.string.isRequired,
};

const MotionListItem = ({
  title,
  creator,
  createdAt,
  link,
  onVote,
  voteData,
}) => (
  <Card>
    <CardHeader>
      <Heading size="3">
        <Link to={link}>{title}</Link>
      </Heading>
      <DetailsBar>
        {creator && <PersonContainer user={creator} />}
        <Detail text={createdAt} icon="clock-o" />
      </DetailsBar>
    </CardHeader>
    <CardActions noSpacing>
      <CardButton
        active={voteData === 'pro'}
        action={() => onVote('pro')}
        type="pro"
        children="Voor"
      />
      <CardButton
        active={voteData === 'neutral'}
        action={() => onVote('neutral')}
        type="neutral"
        children="Neutraal"
      />
      <CardButton
        active={voteData === 'con'}
        action={() => onVote('con')}
        type="con"
        children="Tegen"
      />
    </CardActions>
  </Card>
);

MotionListItem.propTypes = propTypes;

export default MotionListItem;
