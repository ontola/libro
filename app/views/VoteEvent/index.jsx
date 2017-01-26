import React from 'react';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, PropertyBase } from 'link-redux';

// import '../VoteData/VoteData.scss';
import {
  LinkedDetailDate,
} from 'components';

class VoteEvent extends PropertyBase {
  render() {
    return (
      <div itemScope>
        <Property label="schema:result" />
        <LinkedDetailDate />
        <Property label="argu:votes" />
      </div>
    );
  }
}

LinkedRenderStore.registerRenderer(
  VoteEvent,
  ['argu:VoteEvent', 'aod:VoteEvent'],
  RENDER_CLASS_NAME,
  'voteEvent'
);

export { default as Members } from './properties/members';
export { default as Views } from './properties/views';
