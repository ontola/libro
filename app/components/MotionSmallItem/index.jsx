import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import PersonContainer from 'containers/PersonContainer';

import Card, {
  CardActions,
  CardButton,
  CardHeader,
} from '../Card';
import DetailDate from '../DetailDate';
import DetailsBar from '../DetailsBar';
import Heading from '../Heading';

const propTypes = {
  title: PropTypes.string.isRequired,
  creator: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  link: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
  voteData: PropTypes.string,
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
        <DetailDate date={createdAt} />
      </DetailsBar>
    </CardHeader>
    <CardActions noSpacing>
      <CardButton
        active={voteData === 'yes'}
        action={() => onVote('yes')}
        type="yes"
      >Voor</CardButton>
      <CardButton
        active={voteData === 'neutral'}
        action={() => onVote('neutral')}
        type="neutral"
      >Neutraal</CardButton>
      <CardButton
        active={voteData === 'no'}
        action={() => onVote('no')}
        type="no"
      >Tegen</CardButton>
    </CardActions>
  </Card>
);

MotionSmallItem.propTypes = propTypes;

export default MotionSmallItem;
