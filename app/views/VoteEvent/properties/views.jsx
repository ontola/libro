import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
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
  const totalCount = linkedRenderStore.getResourceProperty(NS.argu('totalCount'), props.subject);
  const obs = linkedRenderStore.getResourcePropertyRaw(
    props.subject,
    props.label
  ).map(iri => (
    <LinkedResourceContainer
      grandTotal={totalCount}
      subject={iri.object}
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
