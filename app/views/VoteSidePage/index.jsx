import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  LinkedResourceContainer,
  lowLevel,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  subject: subjectType,
};

/**
 * Renders a page of a certain side of votes.
 * @param {object} props comp props
 * @returns {object} The component
 */
const VoteSidePage = (props, { linkedRenderStore }) => {
  const members = linkedRenderStore.getResourcePropertyRaw(props.subject, NS.argu('members'));
  return (
    <div className="VoteData__votesegment-wrapper">
      {members && members.map(iri => (
        <LinkedResourceContainer
          key={`v-${props.subject}-${iri}`}
          subject={iri.object}
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
  lowLevel.linkedSubject(lowLevel.linkedVersion(VoteSidePage)),
  [NS.argu('Collection'), NS.hydra('Collection')],
  RENDER_CLASS_NAME,
  NS.argu('voteSidePage')
);

// import './properties/members';
