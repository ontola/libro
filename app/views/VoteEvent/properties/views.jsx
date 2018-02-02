import LinkedRenderStore from 'link-lib';
import {
  LinkedObjectContainer,
  getLinkedObjectProperty,
  getLinkedObjectPropertyRaw,
  labelType,
  lowLevel,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { VoteData } from '../../../components';

const propTypes = {
  label: labelType,
  subject: subjectType,
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
      object={iri.object}
      topology={NS.argu('voteSide')}
    />
  ));

  if (obs) {
    return <VoteData>{obs}</VoteData>;
  }
  return null;
};

VoteViews.contextTypes = {
  linkedRenderStore: PropTypes.object,
  topology: PropTypes.object,
};
VoteViews.propTypes = propTypes;


LinkedRenderStore.registerRenderer(
  lowLevel.linkedSubject(lowLevel.linkedVersion(VoteViews)),
  NS.argu('Collection'),
  NS.argu('views'),
  NS.argu('voteEvent')
);
