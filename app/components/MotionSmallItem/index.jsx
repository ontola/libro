import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import PersonContainer from 'containers/PersonContainer';

import {
  Card,
  CardActions,
  CardButton,
  CardHeader,
  Detail,
  DetailsBar,
  Heading,
} from 'components';

const propTypes = {
  title: PropTypes.string.isRequired,
  creator: PropTypes.string,
  createdAt: PropTypes.string,
  link: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
  voteData: PropTypes.string.isRequired,
};

const MotionSmallItem = ({
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

MotionSmallItem.propTypes = propTypes;

export default MotionSmallItem;
