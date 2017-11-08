import React, { PropTypes } from 'react';

import ArgumentsContainer from 'containers/ArgumentsContainer';

import Card, {
  CardActions,
  CardButton,
  CardContent,
  CardHeader,
} from '../Card';
import Heading from '../Heading';
import Markdown from '../Markdown';

const propTypes = {
  id: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
  text: PropTypes.string,
  title: PropTypes.string.isRequired,
  voteData: PropTypes.string.isRequired,
};

const MotionCompare = ({
  id,
  title,
  text,
  onVote,
  voteData,
}) => (
  <Card>
    <CardHeader>
      <Heading size="2">{title}</Heading>
    </CardHeader>
    {id &&
      <CardContent noSpacing>
        <Markdown text={text} />
        <ArgumentsContainer motionId={id} />
      </CardContent>
    }
    <CardActions noSpacing>
      <CardButton
        action={() => onVote('yes')}
        active={voteData === 'yes'}
        type="yes"
      >Voor
      </CardButton>
      <CardButton
        action={() => onVote('neutral')}
        active={voteData === 'neutral'}
        type="neutral"
      >Neutraal
      </CardButton>
      <CardButton
        action={() => onVote('no')}
        active={voteData === 'no'}
        type="no"
      >Tegen
      </CardButton>
    </CardActions>
  </Card>
);

MotionCompare.propTypes = propTypes;

export default MotionCompare;
