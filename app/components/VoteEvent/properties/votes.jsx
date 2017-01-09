import React from 'react';
import { LinkedObjectContainer, Property, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class Votes extends PropertyBase {
  getArguLinkedRecordURL() {
    return `https://argu.local/lr?iri=${this.context.schemaObject['@id']}`;
  }

  render() {
    const prop = this.getLinkedObjectProperty();
    if (!prop && this.context.schemaObject && this.context.schemaObject['@id']) {
      return (
        <LinkedObjectContainer object={this.getArguLinkedRecordURL()}>
          <Property label={this.props.label} />
        </LinkedObjectContainer>
      );
    } else if (!prop) {
      return null;
    }
    return (
      <div className={`VoteData__votebar`}>
        <div className="VoteData__votebar-part" style={{width: '100%'}}>
          <div className="VoteData__votesegment-wrapper">
            <LinkedObjectContainer object={prop}>
              <Property
                label="http://www.w3.org/ns/hydra/core#member"
                groupBy="http://schema.org/option"
                limit="15"
                style={{display: 'flex'}}
              />
            </LinkedObjectContainer>
          </div>
        </div>
      </div>
    );
  }
}

LinkedRenderStore.registerRenderer(
  Votes,
  'http://schema.org/Thing',
  'argu:votes',
);

export default Votes;
