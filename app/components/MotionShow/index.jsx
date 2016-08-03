// @flow
import './motionShow.scss';
import React, { PropTypes } from 'react';
import Motion from '../../models/Motion';
import PersonContainer from '../../containers/PersonContainer';
import {
  Box,
  Detail,
  DetailsBar,
  DetailProfile,
  Heading,
  VoteButtons,
  VoteData,
} from '../';

const propTypes = {
  data: PropTypes.instanceOf(Motion),
  onVote: PropTypes.func,
  loading: PropTypes.bool,
};

const defaultProps = {
  data: new Motion(),
};

const renderItem = (user, url) => (
  <DetailProfile
    name={user.name}
    imageUrl={user.image}
    url={url}
  />
);

const MotionShow = ({ data, onVote }) => (
  <div className="MotionShow">
    <Box>
      <Heading size="2" children={data.title} />
      <DetailsBar>
        <Detail text="Motie" icon="lightbulb-o" />
        <Detail text="Verworpen" icon="close" />
        <PersonContainer user={data.creator} renderItem={renderItem} />
        <Detail text={data.created_at} icon="clock-o" />
      </DetailsBar>
      <div>{data.text}</div>
      <VoteButtons id={data.id} onVote={onVote} />
    </Box>
    <VoteData data={data.votes} expanded />
  </div>
);

MotionShow.propTypes = propTypes;
MotionShow.defaultProps = defaultProps;

export default MotionShow;
