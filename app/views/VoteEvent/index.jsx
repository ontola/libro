import React from 'react';
import { RENDER_CLASS_NAME } from 'link-lib';
import { Property, PropertyBase } from 'link-redux';

// import '../VoteData/VoteData.scss';
import { LinkedDetailDate } from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

class VoteEvent extends PropertyBase {
  render() {
    return (
      <div itemScope>
        <Property label={NS.schema('result')} />
        <LinkedDetailDate />
        <Property label={NS.argu('votes')} />
      </div>
    );
  }
}

LinkedRenderStore.registerRenderer(
  VoteEvent,
  [NS.argu('VoteEvent'), NS.aod('VoteEvent')],
  RENDER_CLASS_NAME,
  NS.argu('collection')
);
LinkedRenderStore.registerRenderer(
  VoteEvent,
  [NS.argu('VoteEvent'), NS.aod('VoteEvent')],
  RENDER_CLASS_NAME,
  NS.argu('voteEvent')
);

export { default as Members } from './properties/members';
export { default as Views } from './properties/views';
