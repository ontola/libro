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
      theme="box"
    />
    <Button
      onClick={() => onVote({
        id,
        side: 'neutral',
      })}
      icon="pause"
      children="Neutraal"
      theme="box"
    />
    <Button
      onClick={() => onVote({
        id,
        side: 'con',
      })}
      icon="thumbs-down"
      children="Ik ben tegen"
      theme="box"
    />
  </div>
);

VoteButtons.propTypes = propTypes;

export default VoteButtons;
