import React, { PropTypes } from 'react';
import { getP, RENDER_CLASS_NAME } from 'link-lib';
import { Property, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../helpers/LinkedRenderStore';

const propTypes = {
  optionCounts: PropTypes.objectOf({
    yes: PropTypes.number,
    neutral: PropTypes.number,
    no: PropTypes.number,
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
  'voteEvent'
);

/**
 * Renders a collection of vote events
 */
class VoteEvent extends PropertyBase {
  shouldComponentUpdate(nextProps, Ignore, nextContext) {
    const { data } = this.props;
    return !(data && getP(data, '@type') === getP(nextProps.data, '@type')) ||
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
  'voteEventCollection'
);

export default VoteEventCollection;
export { default as Views } from './properties/views';
