import { getValueOrID } from 'link-lib';
import {
  getLinkedObjectProperty,
  getLinkedObjectPropertyRaw,
  LinkedObjectContainer,
  lowLevel,
} from 'link-redux';
import React, { PropTypes } from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  label: PropTypes.object,
  subject: PropTypes.object,
};

/**
 * Renders the collections of each option (voteSide) in the voteEvent
 *
 * This component is too complex since the above data structure isn't normalized enough.
 * @param {object} props comp props
 * @return {object} The component
 */
const VoteViews = (props, { linkedRenderStore }) => {
  const totalCount = getLinkedObjectProperty(NS.argu('totalCount'), props.subject, linkedRenderStore);
  const obs = getLinkedObjectPropertyRaw(
    props.label,
    props.subject,
    linkedRenderStore
  ).map(iri => (
    <LinkedObjectContainer
      grandTotal={totalCount}
      object={getValueOrID(iri)}
      topology={NS.argu('voteSide')}
    />
  ));
  if (obs) {
    return (
      <div className="VoteData__votebar">
        {obs}
      </div>
    );
  }
  return null;
};

VoteViews.contextTypes = {
  linkedRenderStore: PropTypes.object,
  topology: PropTypes.string,
};
VoteViews.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteViews,
  'argu:Collection',
  'argu:views',
  'argu:voteEvent'
);
