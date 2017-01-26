import React, { PropTypes } from 'react';
import LinkedRenderStore, { getValueOrID } from 'link-lib';
import { LinkedObjectContainer } from 'link-redux';

import { calcPercentage } from 'helpers/numbers';

function side(url) {
  if (getValueOrID(url).includes('yes')) {
    return 'yes';
  } else if (getValueOrID(url).includes('no')) {
    return 'no';
  }
  return 'neutral';
}

const propTypes = {
  grandTotal: PropTypes.number,
  linkedProp: PropTypes.object,
  memberCount: PropTypes.number,
};

/**
 * Renders a side-filtered collection.
 * The collection contains a collection of pages for this filter.
 * @TODO Get the right side into the className
 * @return {ReactElement} This component
 */
const SideViews = ({ grandTotal, linkedProp, memberCount }) => (
  <div
    className={`VoteData__votebar-part VoteData__votebar-part--${side(linkedProp)}`}
    style={{ maxWidth: `${calcPercentage(memberCount, grandTotal)}%` }}
  >
    <LinkedObjectContainer
      object={getValueOrID(linkedProp)}
      topology="voteSidePage"
    />
  </div>
);

SideViews.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  SideViews,
  'argu:Collection',
  'argu:views',
  'voteSide'
);

export default SideViews;
