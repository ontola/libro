// @flow
import './votebuttons.scss';
import React, { PropTypes } from 'react';
import { Button } from '../';

const propTypes = {
  identifier: PropTypes.number,
  onVote: PropTypes.func.isRequired,
};

const VoteButtons = ({ identifier, onVote }) => (
  <div className="Box__actions">
    <Button
      onClick={() => onVote({
        identifier,
        side: 'pro',
      })}
      icon="thumbs-up"
      children="Ik ben voor"
      theme="box"
    />
    <Button
      onClick={() => onVote({
        identifier,
        side: 'neutral',
      })}
      icon="pause"
      children="Neutraal"
      theme="box"
    />
    <Button
      onClick={() => onVote({
        identifier,
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
