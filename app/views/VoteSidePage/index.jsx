import { LinkedObjectContainer, PropertyBase } from 'link-redux';
import React from 'react';
import { RENDER_CLASS_NAME } from 'link-lib';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  subject: PropTypes.object,
};

/**
 * Renders a page of a certain side of votes.
 * @param {object} props comp props
 * @returns {object} The component
 */
const VoteSidePage = (props, { linkedRenderStore }) => {
  const members = getLinkedObjectPropertyRaw(NS.argu('members'), props.subject, linkedRenderStore);
  return (
    <div className="VoteData__votesegment-wrapper">
      {members && members.map(iri => (
        <LinkedObjectContainer
          key={`v-${props.subject}-${iri}`}
          object={iri.object}
        />
      ))}
    </div>
  );
};

VoteSidePage.contextTypes = {
  linkedRenderStore: PropTypes.object,
  topology: PropTypes.string,
};
VoteSidePage.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteSidePage,
  [NS.argu('Collection'), NS.hydra('Collection')],
  RENDER_CLASS_NAME,
  NS.argu('voteSidePage')
);

// import './properties/members';
