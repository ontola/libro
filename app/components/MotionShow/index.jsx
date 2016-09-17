import React, { PropTypes } from 'react';

import PersonContainer from 'containers/PersonContainer';
import {
  Card,
  CardActions,
  CardButton,
  CardContent,
  CardHeader,
  Detail,
  DetailType,
  DetailsBar,
  Heading,
} from 'components';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  creator: PropTypes.string,
  createdAt: PropTypes.string,
  link: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
  voteData: PropTypes.string.isRequired,
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
        <Detail text={createdAt} icon="clock-o" />
      </DetailsBar>
    </CardHeader>
    <CardContent noSpacing>{children}</CardContent>
    <CardActions>
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

MotionShow.propTypes = propTypes;

export default MotionShow;
