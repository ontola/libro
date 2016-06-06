import './boxActions.scss';
import React, { PropTypes } from 'react';
import { Button } from '../';
import FontAwesome from 'react-fontawesome';

function motionActions() {
  return (
    <div className="box__actions">
      <Button theme="box"><FontAwesome name="thumbs-up" /> Ik ben voor</Button>
      <Button theme="box"><FontAwesome name="pause" /> Neutraal</Button>
      <Button theme="box"><FontAwesome name="thumbs-down" /> Ik ben tegen</Button>
    </div>
  );
}

function argumentActions() {
  return (
    <div className="box__actions">
      <Button theme="box"><FontAwesome name="comment" /> Upvote</Button>
      <Button theme="box"><FontAwesome name="arrow-up" /> Reageer</Button>
    </div>
  );
}


function BoxActions({ type }) {

  let buttons;

  if(type == 'motion')
    buttons = motionActions();
  else if(type == 'argument')
    buttons = argumentActions();

  return (
    <div>{buttons}</div>
  );
}

BoxActions.propTypes = {
  type: PropTypes.string.isRequired,
};

BoxActions.defaultProps = {
  type: 'default',
};

export default BoxActions;
