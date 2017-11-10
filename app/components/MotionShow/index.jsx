import PropTypes from 'prop-types';
import React from 'react';

import PersonContainer from 'containers/PersonContainer';

import Card, {
  CardActions,
  CardButton,
  CardContent,
  CardHeader,
} from '../Card';
import DetailDate from '../DetailDate';
import DetailType from '../DetailType';
import DetailsBar from '../DetailsBar';
import Heading from '../Heading';
import Markdown from '../Markdown';

const propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  creator: PropTypes.string,
  onVote: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  voteData: PropTypes.string,
};

const options = {
  neutral: 'Neutraal',
  no: 'Tegen',
  yes: 'Voor',
};
const order = ['yes', 'neutral', 'no'];

const MotionShow = ({
  title,
  text,
  creator,
  createdAt,
  onVote,
  voteData,
}) => (
  <Card>
    <CardHeader noSpacing>
      <Heading>{title}</Heading>
      <DetailsBar>
        <DetailType type="motion" />
        {creator && <PersonContainer user={creator} />}
        <DetailDate date={createdAt} />
      </DetailsBar>
    </CardHeader>
    <CardContent noSpacing>
      <Markdown
        text={text}
      />
    </CardContent>
    <CardActions>
      {order.map(option => (
        <CardButton
          action={() => onVote(option)}
          active={voteData === option}
          key={option}
          type={option}
        >{options[option]}
        </CardButton>
      ))}
    </CardActions>
  </Card>
);

MotionShow.propTypes = propTypes;

export default MotionShow;
