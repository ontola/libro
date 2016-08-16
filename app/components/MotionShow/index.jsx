// @flow
import './MotionShow.scss';
import React, { PropTypes } from 'react';
import { Motion } from 'models';
import PersonContainer from 'containers/PersonContainer';
import ArgumentsContainer from 'containers/ArgumentsContainer';

import {
  Box,
  Detail,
  DetailsBar,
  Heading,
  VoteButtons,
  VoteData,
} from '../';

const propTypes = {
  data: PropTypes.instanceOf(Motion),
  onVote: PropTypes.func,
  loading: PropTypes.bool,
  next: PropTypes.func,
  showArguments: PropTypes.bool,
  activeVoteMatch: PropTypes.bool,
};

const defaultProps = {
  showArguments: false,
};

const renderItem = (user, url) => (
  <Detail
    text={user.name}
    imageUrl={user.image}
    url={url}
  />
);

const MotionShow = ({
  activeVoteMatch,
  data,
  onVote,
  next,
  showArguments,
}) => (
  <div className="MotionShow">
    <Box>
      <Heading size="2" children={data.title} />
      <DetailsBar>
        <Detail text="Motie" icon="lightbulb-o" />
        <Detail text="Verworpen" icon="close" />
        {data.creator &&
          <PersonContainer
            user={data.creator}
            renderItem={renderItem}
          />
        }
        {data.createdAt &&
          <Detail
            text={data.createdAt}
            icon="clock-o"
          />
        }
      </DetailsBar>
      <div>{data.text}</div>
      {showArguments && <ArgumentsContainer motionId={data.id} />}
      <VoteButtons id={data.id} onVote={activeVoteMatch ? next : onVote} />
    </Box>
    <VoteData data={data.votes} expanded />
  </div>
);

MotionShow.propTypes = propTypes;
MotionShow.defaultProps = defaultProps;

export default MotionShow;
