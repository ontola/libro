import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  PropertyBase,
  labelType,
  withLinkCtx,
} from 'link-redux';
import React from 'react';

import { Heading, Link } from '../../../components';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { CollectionViewTypes } from '../types';

const propTypes = {
  label: labelType,
};

class CollectionName extends PropertyBase {
  render() {
    const href = this.getLinkedObjectProperty(ontola.href);
    const Wrapper = typeof href !== 'undefined' ? Link : 'div';

    return (
      <Wrapper to={href}>
        <Heading size="2">
          {this.props.linkedProp.value}
        </Heading>
      </Wrapper>
    );
  }
}

CollectionName.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  withLinkCtx(CollectionName),
  CollectionViewTypes,
  schema.name,
  allTopologies
);
