import React from 'react';
import LinkedRenderStore, { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase, RENDER_CLASS_NAME } from 'link-redux';

/**
 * Renders a page of a certain side of votes.
 */
class VoteSidePage extends PropertyBase {
  render() {
    const members = this.getLinkedObjectPropertyRaw('argu:members');
    return (
      <div className="VoteData__votesegment-wrapper">
        {members && members.map(iri => <LinkedObjectContainer object={getValueOrID(iri)} />)}
      </div>
    );
  }
}

LinkedRenderStore.registerRenderer(
  VoteSidePage,
  ['argu:Collection', 'hydra:Collection'],
  RENDER_CLASS_NAME,
  'voteSidePage'
);

// import './properties/members';
