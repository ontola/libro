import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, PropertyBase } from 'link-redux';
import React from 'react';

import { LinkedDetailDate } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

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

[
  undefined,
  NS.argu('collection'),
  NS.argu('voteEvent'),
  NS.argu('voteEventCollection'),
].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    VoteEvent,
    [NS.argu('VoteEvent'), NS.aod('VoteEvent')],
    RENDER_CLASS_NAME,
    top
  );
});

export { default as Members } from './properties/members';
export { default as Views } from './properties/views';
