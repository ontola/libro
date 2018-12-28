import LinkedRenderStore from 'link-lib';
import {
  PropertyBase,
  labelType,
  withLinkCtx,
} from 'link-redux';
import React from 'react';
import { Link } from 'react-router-dom';

import { Heading } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../../topologies';
import { CollectionTypes } from '../types';
import { headerTopology } from '../../../topologies/Header';
import { parentTopology } from '../../../topologies/Parent';
import { tableRowTopology } from '../../../topologies/TableRow';

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

export default [
  LinkedRenderStore.registerRenderer(
    withLinkCtx(CollectionName),
    CollectionTypes,
    NS.as('name'),
    allTopologiesExcept(headerTopology, parentTopology, tableRowTopology)
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => linkedProp.value,
    CollectionTypes,
    NS.as('name'),
    tableRowTopology
  ),
];
