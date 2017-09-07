import {
  getLinkedObjectProperty,
  lowLevel,
  PropertyBase
} from 'link-redux';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  Heading,
} from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  label: PropTypes.object,
};

class CollectionName extends PropertyBase {
  render() {
    const propVal = getLinkedObjectProperty(
      this.props.label,
      this.props.subject,
      this.context.linkedRenderStore
    );
    return (
      <Link to={this.getLinkedObjectProperty(NS.argu('href'))}>
        <Heading size="2" variant="column">
          {propVal}
        </Heading>
      </Link>
    );
  }
}

CollectionName.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  lowLevel.linkedSubject(lowLevel.linkedVersion(CollectionName)),
  NS.argu('Collection'),
  NS.schema('name')
);

export default CollectionName;
