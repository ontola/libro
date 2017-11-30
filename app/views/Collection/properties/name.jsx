import LinkedRenderStore from 'link-lib';
import {
  PropertyBase,
  getLinkedObjectProperty,
  labelType,
  lowLevel,
} from 'link-redux';
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Heading,
} from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  label: labelType,
};

class CollectionName extends PropertyBase {
  render() {
    const propVal = getLinkedObjectProperty(
      this.props.label,
      this.props.subject,
      this.context.linkedRenderStore
    );
    const href = this.getLinkedObjectProperty(NS.argu('href'));
    const Wrapper = typeof href !== 'undefined' ? Link : 'div';

    return (
      <Wrapper to={href}>
        <Heading size="2" variant="column">
          {propVal}
        </Heading>
      </Wrapper>
    );
  }
}

CollectionName.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  lowLevel.linkedSubject(lowLevel.linkedVersion(CollectionName)),
  NS.argu('Collection'),
  NS.schema('name')
);
