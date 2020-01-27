import schema from '@ontologies/schema';
import {
  Resource,
  linkType,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import { BreadcrumbsBar } from '../../../components';
import Container from '../../../topologies/Container';
import { CollectionTypes } from '../types';
import { fullResourceTopology } from '../../../topologies/FullResource';
import ontola from '../../../ontology/ontola';

const IsPartOfPage = ({ collectionDisplay, linkedProp }) => (
  <Container size={collectionDisplay === ontola.ns('collectionDisplay/grid') ? 'large' : null}>
    <BreadcrumbsBar>
      <Resource subject={linkedProp} />
    </BreadcrumbsBar>
  </Container>
);

IsPartOfPage.type = CollectionTypes;

IsPartOfPage.property = schema.isPartOf;

IsPartOfPage.topology = fullResourceTopology;

IsPartOfPage.mapDataToProps = {
  collectionDisplay: ontola.collectionDisplay,
};

IsPartOfPage.propTypes = {
  collectionDisplay: linkType,
  linkedProp: linkedPropType,
};

export default register(IsPartOfPage);
