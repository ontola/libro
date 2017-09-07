import { getValueOrID } from 'link-lib';
import { PropertyBase } from 'link-redux';
import React from 'react';

import {
  Container,
  Cover,
} from '../../components';
import VoteMatchVoteableContainer from '../../containers/VoteMatchVoteableContainer';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

class Motions extends PropertyBase {
  static renderMotion(m, i) {
    const step = `voteMatch-step-${i}`;
    return (
      <div
        className="VoteMatchShow__motion"
        id={step}
        key={step}
      >
        <Cover fullScreen>
          <Container>
            <VoteMatchVoteableContainer next={i} object={m} />
          </Container>
        </Cover>
      </div>
    );
  }

  render() {
    const motions = this.getLinkedObjectPropertyRaw();
    return (
      <div className="VoteMatchShow__motionsList">
        {motions.map((m, i) => Motions.renderMotion(getValueOrID(m), i))}
      </div>
    );
  }
}

LinkedRenderStore.registerRenderer(
  Motions,
  NS.argu('Collection'),
  NS.argu('members'),
  NS.argu('voteMatch')
);

export default Motions;
