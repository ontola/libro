import React from 'react';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class Votes extends PropertyBase {
  render() {
    const prop = this.getLinkedObjectProperty();
    if (!prop) {
      return null;
    }
    return (
      <div className="VoteData__votebar">
        <div className="VoteData__votesegment-wrapper">
          <LinkedObjectContainer
            object={prop}
            optionCounts={
              this.getLinkedObjectProperty('schema:optionCounts') ||
                this.getLinkedObjectProperty('aod:option_counts')
            }
          />
        </div>
      </div>
    );
  }
}

LinkedRenderStore.registerRenderer(
  Votes,
  ['argu:VoteEvent', 'aod:VoteEvent'],
  'argu:votes'
);

export default Votes;
