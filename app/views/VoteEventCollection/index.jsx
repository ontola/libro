import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, PropertyBase } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  optionCounts: PropTypes.objectOf({
    neutral: PropTypes.number,
    no: PropTypes.number,
    yes: PropTypes.number,
  }),
};

/**
 * Renders a collection of VoteEvents.
 * @returns {ReactElement} The vote event collection component
 */
const VoteEventCollection = ({ optionCounts }) => (
  <Property label={NS.as('pages')} optionCounts={optionCounts} />
);

VoteEventCollection.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteEventCollection,
  NS.as('Collection'),
  RENDER_CLASS_NAME,
  NS.argu('voteEvent')
);

/**
 * Renders a collection of vote events
 */
class VoteEvent extends PropertyBase {
  shouldComponentUpdate(nextProps, Ignore, nextContext) {
    const { data } = this.props;
    return !(data && data['http://www.w3.org/1999/02/22-rdf-syntax-ns#type'] === nextProps.data['http://www.w3.org/1999/02/22-rdf-syntax-ns#type'])
      || this.getLinkedObjectProperty(NS.argu('member')) !== this.getLinkedObjectProperty(NS.argu('member'), nextContext.schemaObject);
  }

  render() {
    // @TODO <Property label="argu:counts"/>
    return (
      <div className="VoteData">
        <Property label={NS.as('items')} />
      </div>
    );
  }
}

LinkedRenderStore.registerRenderer(
  VoteEvent,
  [NS.argu('VoteEvent'), NS.aod('VoteEvent')],
  RENDER_CLASS_NAME,
  [NS.argu('section'), NS.argu('voteEventCollection')]
);

export default VoteEventCollection;
export { default as Views } from './properties/views';
