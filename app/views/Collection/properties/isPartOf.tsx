import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import BreadcrumbsBar from '../../../components/Breadcrumbs/BreadcrumbsBar';
import { useCollectionOptions } from '../../../components/Collection/CollectionProvider';
import { Size } from '../../../components/shared/config';
import ontola from '../../../ontology/ontola';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { CollectionTypes } from '../types';

export interface IsPartOfProps {
  linkedProp: SomeTerm,
}

const IsPartOfPage: FC<IsPartOfProps> = ({ linkedProp }) => {
  const { collectionDisplay } = useCollectionOptions();

  return (
    <Container size={collectionDisplay === ontola.ns('collectionDisplay/grid') ? Size.Large : undefined}>
      <BreadcrumbsBar>
        <Resource subject={linkedProp} />
      </BreadcrumbsBar>
    </Container>
  );
};

IsPartOfPage.type = CollectionTypes;

IsPartOfPage.property = schema.isPartOf;

IsPartOfPage.topology = fullResourceTopology;

IsPartOfPage.mapDataToProps = {
  collectionDisplay: ontola.collectionDisplay,
};

export default register(IsPartOfPage);