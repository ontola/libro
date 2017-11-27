import PropTypes from 'prop-types';
import React from 'react';
import { getValueOrID } from 'link-lib';
import {
  LinkedObjectContainer,
  getLinkedObjectProperty,
  labelType,
  linkedPropType,
  subjectType,
} from 'link-redux';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';
import { calcPercentage } from '../../../helpers/numbers';

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
  label: labelType,
  linkedProp: linkedPropType,
  subject: subjectType,
};

/**
 * Renders a side-filtered collection.
 * The collection contains a collection of pages for this filter.
 * @TODO Get the right side into the className
 * @returns {object} The component
 */
const SideViews = ({
  grandTotal, label, linkedProp, subject
}, { linkedRenderStore }) => {
  const prop = linkedProp || getLinkedObjectProperty(
    label,
    subject,
    linkedRenderStore,
    true
  );
  const memberCount = getLinkedObjectProperty(NS.argu('totalCount'), subject, linkedRenderStore);
  // TODO: Export a component to abstract the x-part--{side} API
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
SideViews.contextTypes = {
  linkedRenderStore: PropTypes.object,
};

LinkedRenderStore.registerRenderer(
  SideViews,
  NS.argu('Collection'),
  NS.argu('views'),
  NS.argu('voteSide')
);

export default SideViews;
