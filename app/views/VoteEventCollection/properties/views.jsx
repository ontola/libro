import { LinkedObjectContainer, PropertyBase } from 'link-redux';
import React from 'react';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

const propTypes = {
  label: PropTypes.object,
  subject: PropTypes.object,
};

/**
 * Renders the property that contains a 'VoteEventCollection'
 * @param {object} props comp props
 * @returns {object} The component
 */
class Views extends PropertyBase {
  render() {
    const prop = this.getLinkedObjectProperty();
    if (!prop) {
      return null;
    }
    const optionCounts = this.getLinkedObjectProperty('schema:optionCounts')
      || this.getLinkedObjectProperty('aod:option_counts');
    return (
      <LinkedObjectContainer
        object={prop}
        optionCounts={optionCounts}
        topology="argu:voteEvent"
      />
    );
  }
  return (
    <LinkedObjectContainer
      object={prop}
      topology={NS.argu('voteEvent')}
    />
  );
};

Views.contextTypes = {
  linkedRenderStore: PropTypes.object,
  topology: PropTypes.string,
};
Views.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Views,
  ['argu:VoteEvent', 'aod:VoteEvent', 'argu:Collection'],
  'argu:votes',
  'argu:voteEvent'
);

export default Views;
