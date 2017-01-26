import LinkedRenderStore, { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';
import React from 'react';

function getCount(i, counts) {
  const keys = Object.keys(counts.toJS());
  return counts.getIn([keys[i], 0, '@value']);
}

/**
 * Renders the collections of each option (voteSide) in the voteEvent
 *
 * This component is too complex since the above data structure isn't normalized enough.
 */
class VoteViews extends PropertyBase {
  render() {
    const total = this.props.optionCounts.reduce((a, b) => a + b.getIn([0, '@value']), 0);
    const obs = this.getLinkedObjectPropertyRaw()
      .map((iri, i) => (
        <LinkedObjectContainer
          object={getValueOrID(iri)}
          topology="voteSide"
          grandTotal={total}
          memberCount={getCount(i, this.props.optionCounts)}
        />
      ))
      .toKeyedSeq();
    if (obs) {
      return (
        <div className="VoteData__votebar">
          {obs}
        </div>
      );
    }
    return null;
  }
}

LinkedRenderStore.registerRenderer(
  VoteViews,
  'argu:Collection',
  'argu:views',
  'voteEvent'
);
