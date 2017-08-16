import { RENDER_CLASS_NAME } from 'link-lib';
import {
  lowLevel,
  Property,
} from 'link-redux';
import React, { PropTypes } from 'react';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

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
  VoteSide,
  [NS.argu('Collection'), NS.hydra('Collection')],
  RENDER_CLASS_NAME,
  NS.argu('voteSide')
);

import './properties/views';

export default VoteSide;
