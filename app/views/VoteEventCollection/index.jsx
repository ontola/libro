import { RENDER_CLASS_NAME } from 'link-lib';
import { Property, PropertyBase } from 'link-redux';
import React, { PropTypes } from 'react';

import LinkedRenderStore from '../../helpers/LinkedRenderStore';

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
  <Property label="argu:views" optionCounts={optionCounts} />
);

VoteEventCollection.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteEventCollection,
  'argu:Collection',
  RENDER_CLASS_NAME,
  'argu:voteEvent'
);

/**
 * Renders a collection of vote events
 */
class VoteEvent extends PropertyBase {
  shouldComponentUpdate(nextProps, Ignore, nextContext) {
    const { data } = this.props;
    return !(data && data['http://www.w3.org/1999/02/22-rdf-syntax-ns#type'] === nextProps.data['http://www.w3.org/1999/02/22-rdf-syntax-ns#type']) ||
      this.getLinkedObjectProperty('argu:member') !==
        this.getLinkedObjectProperty('argu:member', nextContext.schemaObject);
  }

  render() {
    // @TODO <Property label="argu:counts"/>
    return (
      <div className="VoteData">
        <Property label="argu:members" />
      </div>
    );
  }
}

LinkedRenderStore.registerRenderer(
  VoteEvent,
  ['argu:VoteEvent', 'aod:VoteEvent'],
  RENDER_CLASS_NAME,
  'argu:voteEventCollection'
);

export default VoteEventCollection;
export { default as Views } from './properties/views';
