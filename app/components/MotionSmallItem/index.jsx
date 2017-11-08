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
  createdAt: PropTypes.instanceOf(Date),
  creator: PropTypes.string,
  link: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
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

MotionSmallItem.propTypes = propTypes;

export default MotionSmallItem;
