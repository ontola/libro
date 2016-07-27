// @flow
import './motionShow.scss';
import React, { PropTypes } from 'react';
import Motion from '../../models/Motion';
import {
  Box,
  Detail,
  DetailsBar,
  Heading,
  MarkdownContent,
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

const MotionShow = ({ data, onVote }) => (
  <div className="MotionShow">
    <Box>
      <Heading size="2" children={data.title} />
      <DetailsBar>
        <Detail text="Motie" icon="lightbulb-o" />
        <Detail text="Verworpen" icon="close" />
        <Detail text="Joep Meindertsma" icon="user" />
        <Detail text="3 minuten geleden" icon="clock-o" />
      </DetailsBar>
      <MarkdownContent content={data.text} />
      <VoteButtons id={data.id} onVote={onVote} />
    </Box>
    <VoteData data={data.votes} expanded />
  </div>
);

MotionShow.propTypes = propTypes;
MotionShow.defaultProps = defaultProps;

export default MotionShow;
