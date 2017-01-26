import React from 'react';
import LinkedRenderStore from 'link-lib';
import { Property, PropertyBase, RENDER_CLASS_NAME } from 'link-redux';

/**
 * Renders a collection for each side of a vote.
 * The collection rendered should contain the pages for this side.
 */
class VoteSide extends PropertyBase {
  render() {
    return (
      <Property
        label="argu:views"
        linkedProp={this.getLinkedObjectPropertyRaw('argu:views')}
        memberCount={this.props.memberCount}
      />
    );
  }
}

LinkedRenderStore.registerRenderer(
  VoteSide,
  ['argu:Collection', 'hydra:Collection'],
  RENDER_CLASS_NAME,
  'voteSide'
);

import './properties/views';

export default VoteSide;
