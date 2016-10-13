import React, { PropTypes } from 'react';

import ArgumentsContainer from 'containers/ArgumentsContainer';
import {
  Card,
  CardActions,
  CardButton,
  CardContent,
  CardHeader,
  Heading,
} from 'components';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
  voteData: PropTypes.string.isRequired,
};

const MotionCompare = ({
  id,
  title,
  onVote,
  voteData,
}) => (
  <Card>
    <CardHeader>
      <Heading size="2">{title}</Heading>
    </CardHeader>
    {id &&
      <CardContent noSpacing>
        <ArgumentsContainer motionId={id} />
      </CardContent>
    }
    <CardActions noSpacing>
      <CardButton
        active={voteData === 'pro'}
        action={() => onVote('pro')}
        type="pro"
      >Voor</CardButton>
      <CardButton
        active={voteData === 'neutral'}
        action={() => onVote('neutral')}
        type="neutral"
      >Neutraal</CardButton>
      <CardButton
        active={voteData === 'con'}
        action={() => onVote('con')}
        type="con"
      >Tegen</CardButton>
    </CardActions>
  </Card>
);

MotionCompare.propTypes = propTypes;

export default MotionCompare;
