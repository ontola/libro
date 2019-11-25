import as from '@ontologies/as';
import LinkedRenderStore from 'link-lib';
import {
  PropertyBase,
  labelType,
  withLinkCtx,
} from 'link-redux';
import React from 'react';

import { Heading, Link } from '../../../components';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { CollectionTypes } from '../types';
import { navbarTopology } from '../../../topologies/Navbar';
import { parentTopology } from '../../../topologies/Parent';
import { tableRowTopology } from '../../../topologies/TableRow';

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

export default [
  LinkedRenderStore.registerRenderer(
    withLinkCtx(CollectionName),
    CollectionTypes,
    as.name,
    allTopologiesExcept(navbarTopology, parentTopology, tableRowTopology)
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => linkedProp.value,
    CollectionTypes,
    as.name,
    tableRowTopology
  ),
];
