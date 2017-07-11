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
  label: PropTypes.object,
  linkedProp: PropTypes.object,
  subject: PropTypes.object,
};

/**
 * Renders a side-filtered collection.
 * The collection contains a collection of pages for this filter.
 * @TODO Get the right side into the className
 * @returns {object} The component
 */
const SideViews = ({ grandTotal, label, linkedProp, subject }, { linkedRenderStore }) => {
  const prop = linkedProp || getLinkedObjectProperty(
    label,
    subject,
    linkedRenderStore,
    true
  );
  const memberCount = getLinkedObjectProperty(NS.argu('totalCount'), subject, linkedRenderStore);
  return (
    <div
      className={`VoteData__votebar-part VoteData__votebar-part--${side(prop)}`}
      style={{ maxWidth: `${calcPercentage(parseInt(memberCount, 10), parseInt(grandTotal, 10))}%` }}
    >
      <LinkedObjectContainer
        object={prop}
        topology={NS.argu('voteSidePage')}
      />
    </div>
  );
};

SideViews.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  SideViews,
  'argu:Collection',
  'argu:views',
  'voteSide'
);

export default SideViews;
