import React from 'react';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

/**
 * Renders the property that contains a 'VoteEventCollection'
 */
class Views extends PropertyBase {
  render() {
    const prop = this.getLinkedObjectProperty();
    if (!prop) {
      return null;
    }
    const optionCounts = this.getLinkedObjectProperty('schema:optionCounts')
      || this.getLinkedObjectProperty('aod:option_counts');
    return (
      <LinkedObjectContainer
        object={prop}
        optionCounts={optionCounts}
        topology="voteEvent"
      />
    );
  }
}


LinkedRenderStore.registerRenderer(
  Views,
  ['argu:VoteEvent', 'aod:VoteEvent', 'argu:Collection'],
  'argu:votes',
  'voteEvent'
);

export default Views;
