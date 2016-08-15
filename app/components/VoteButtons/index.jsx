// @flow
import './VoteButtons.scss';
import React, { PropTypes } from 'react';
import { Button } from 'components';

const propTypes = {
  id: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
};

const buttons = [{
  side: 'pro',
  icon: 'thumbs-up',
  label: 'Ik ben voor',
}, {
  side: 'neutral',
  icon: 'pause',
  label: 'Neutraal',
}, {
  side: 'con',
  icon: 'thumbs-down',
  label: 'Ik ben tegen',
}];

const VoteButtons = ({ id, onVote }) => (
  <div className="Box__actions">
    {buttons.map((button, i) =>
      <Button
        key={i}
        onClick={() => onVote({
          motionId: id,
          side: button.side,
        })}
        icon={button.icon}
        children={button.label}
        theme="box"
        variant={button.side}
      />
    )}
  </div>
);

VoteButtons.propTypes = propTypes;

export default VoteButtons;
