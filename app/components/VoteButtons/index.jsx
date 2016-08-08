// @flow
import './votebuttons.scss';
import React, { PropTypes } from 'react';
import { Button } from '../';

const propTypes = {
  id: PropTypes.string,
  onVote: PropTypes.func,
};

const VoteButtons = ({ id, onVote }) => (
  <div className="Box__actions">
    <Button
      onClick={() => onVote({
        id,
        side: 'pro',
      })}
      icon="thumbs-up"
      children="Ik ben voor"
      theme="pro"
    />
    <Button
      onClick={() => onVote({
        id,
        side: 'neutral',
      })}
      icon="pause"
      children="Neutraal"
      theme="neutral"
    />
    <Button
      onClick={() => onVote({
        id,
        side: 'con',
      })}
      icon="thumbs-down"
      children="Ik ben tegen"
      theme="con"
    />
  </div>
);

VoteButtons.propTypes = propTypes;

export default VoteButtons;
