import LinkedRenderStore from 'link-lib';
import {
  PropertyBase,
  labelType,
  lowLevel,
} from 'link-redux';
import React from 'react';
import { Link } from 'react-router-dom';

import { Heading } from '../../../components';
import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';
import { CollectionTypes } from '../types';

const propTypes = {
  label: labelType,
};

class CollectionName extends PropertyBase {
  render() {
    const href = this.getLinkedObjectProperty(NS.argu('href'));
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
  lowLevel.linkedSubject(lowLevel.linkedVersion(CollectionName)),
  CollectionTypes,
  NS.schema('name'),
  allTopologies
);
