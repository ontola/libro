import './MotionShow.scss';
import React, { PropTypes } from 'react';

import { Box } from 'components';
import { Motion } from 'models';

const propTypes = {
  data: PropTypes.instanceOf(Motion),
  date: PropTypes.number,
  onVote: PropTypes.func,
  loading: PropTypes.bool,
  next: PropTypes.func,
  showArguments: PropTypes.bool,
  activeVoteMatch: PropTypes.bool,
};

const defaultProps = {
  showArguments: false,
};

const MotionShow = ({
  activeVoteMatch,
  data,
  date,
  onVote,
  next,
}) => {
  const buttonAction = activeVoteMatch ? next : onVote;

  const buttons = [{
    icon: 'thumbs-up',
    label: 'Ik ben voor',
    side: 'pro',
    action: () => buttonAction({
      motionId: data.id,
      side: 'pro',
    }),
  }, {
    icon: 'pause',
    label: 'Neutraal',
    side: 'neutral',
    action: () => buttonAction({
      motionId: data.id,
      side: 'neutral',
    }),
  }, {
    icon: 'thumbs-down',
    label: 'Ik ben tegen',
    side: 'con',
    action: () => buttonAction({
      motionId: data.id,
      side: 'con',
    }),
  }];

  return (
    <div className="MotionShow">
      <Box
        title={data.title}
        author={data.creator}
        date={date}
        children={data.text}
        showArguments={activeVoteMatch}
        showMeta
        id={data.id}
        boxActions={buttons}
        type={data.classification}
      />
    </div>
  );
};

MotionShow.propTypes = propTypes;
MotionShow.defaultProps = defaultProps;

export default MotionShow;
