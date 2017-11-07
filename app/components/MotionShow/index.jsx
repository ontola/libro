import React, { PropTypes } from 'react';

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
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  creator: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  onVote: PropTypes.func.isRequired,
  voteData: PropTypes.string,
};

const options = {
  yes: 'Voor',
  neutral: 'Neutraal',
  no: 'Tegen',
};

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
      {Object.keys(options).map(option => (
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
