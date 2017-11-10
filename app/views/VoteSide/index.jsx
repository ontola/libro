import { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  lowLevel,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/views';

const propTypes = {
  grandTotal: PropTypes.number,
};

/**
 * Renders a collection for each side of a vote.
 * The collection rendered should contain the pages for this side.
 * @returns {object} The component
 */
const VoteSide = ({ grandTotal }) => (
  <Property
    grandTotal={grandTotal}
    label={NS.argu('views')}
  />
);

VoteSide.contextTypes = {
  linkedRenderStore: PropTypes.object,
};
VoteSide.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  lowLevel.linkedSubject(lowLevel.linkedVersion(VoteSide)),
  [NS.argu('Collection'), NS.hydra('Collection')],
  RENDER_CLASS_NAME,
  NS.argu('voteSide')
);

export default VoteSide;
