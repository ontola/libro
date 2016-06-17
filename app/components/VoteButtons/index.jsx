// @flow
import './votebuttons.scss';
import React, { PropTypes } from 'react';
import {
  Button,
} from '../';

const propTypes = {
  onVote: PropTypes.func.isRequired,
};

function VoteButtons({ id, onVote }) {
  return (
    <div className="box__actions">
      <Button
        onClick={ e => onVote({
          id: id,
          side: 'pro',
        })}
        icon="thumbs-up"
        children="Ik ben voor"
        theme="box"
      />
      <Button
        onClick={ e => onVote({
          id: id,
          side: 'neutral',
        })}
        icon="pause"
        children="Neutraal"
        theme="box"
      />
      <Button
        onClick={ e => onVote({
          id: id,
          side: 'con',
        })}
        icon="thumbs-down"
        children="Ik ben tegen"
        theme="box"
      />
    </div>
  );
}

VoteButtons.propTypes = propTypes;

export default VoteButtons;
