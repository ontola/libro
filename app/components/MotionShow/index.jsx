import React, { PropTypes } from 'react';

import PersonContainer from 'containers/PersonContainer';
import {
  Card,
  CardActions,
  CardButton,
  CardContent,
  CardHeader,
  DetailDate,
  DetailType,
  DetailsBar,
  Heading,
} from 'components';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  creator: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  onVote: PropTypes.func.isRequired,
  voteData: PropTypes.string,
};

const options = {
  pro: 'Voor',
  neutral: 'Neutraal',
  con: 'Tegen',
};

const MotionShow = ({
  title,
  children,
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
    <CardContent noSpacing>{children}</CardContent>
    <CardActions>
      {Object.keys(options).map(option => (
        <CardButton
          key={option}
          active={voteData === option}
          action={() => onVote(option)}
          type={option}
        >{options[option]}</CardButton>
      ))}
    </CardActions>
  </Card>
);

MotionShow.propTypes = propTypes;

export default MotionShow;
