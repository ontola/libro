import * as as from '@ontologies/as';
import { SomeNode } from 'link-lib';
import { Property } from 'link-redux';
import React, { ReactNode } from 'react';

import CardHeader from '../../../components/Card/CardHeader';
import CollectionCreateActionButton from '../../../components/Collection/CollectionCreateActionButton';
import CollectionFilterToggle, { CollectionFilterProps } from '../../../components/Collection/CollectionFilterToggle';
import { useCollectionOptions } from '../../../components/Collection/CollectionProvider';
import ContainerHeader from '../../../components/Container/ContainerHeader';
import { buildRegister } from '../../../helpers/buildRegister';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardTopology } from '../../../topologies/Card';
import Container, { LargeContainer, containerTopology } from '../../../topologies/Container';
import { pageTopology } from '../../../topologies/Page';
import { CollectionTypes } from '../types';

interface HeaderProps {
  children?: ReactNode;
  hideHeader?: boolean;
  topologyCtx: SomeNode;
}

export const HeaderFloat = ({ filterContainerRef }: CollectionFilterProps): JSX.Element => {
  const { hidePagination } = useCollectionOptions();
  const renderPagination = !hidePagination;

  return (
    <React.Fragment>
      {renderPagination && <CollectionFilterToggle filterContainerRef={filterContainerRef} />}
      {renderPagination && <Property label={ontola.sortOptions} />}
      <CollectionCreateActionButton />
    </React.Fragment>
  );
};

const cardCollectionHeader = ({
  hideHeader,
}: HeaderProps): JSX.Element | null => {
  if (hideHeader) {
    return null;
  }

  const filterRef = React.useRef(null);

  return (
    <CardHeader float={<HeaderFloat filterContainerRef={filterRef} />}>
      <Property label={as.name} />
      <div ref={filterRef} />
    </CardHeader>
  );
};

const containerCollectionHeader = ({
  hideHeader,
  topologyCtx,
}: HeaderProps): JSX.Element | null => {
  const { collectionDisplay } = useCollectionOptions();
  const filterRef = React.useRef(null);

  let Wrapper = React.Fragment as React.ElementType;

  if (collectionDisplay === ontola['collectionDisplay/default'] && topologyCtx !== containerTopology) {
    Wrapper = Container;
  }

  if (collectionDisplay === ontola['collectionDisplay/grid'] && topologyCtx !== containerTopology) {
    Wrapper = LargeContainer;
  }

  if (hideHeader) {
    return null;
  }

  return (
    <Wrapper>
      <ContainerHeader
        float={<HeaderFloat filterContainerRef={filterRef} />}
      >
        <Property label={as.name} />
      </ContainerHeader>
      <div ref={filterRef} />
    </Wrapper>
  );
};

const registerHeader = buildRegister<HeaderProps>({
  property: ontola.header,
  type: CollectionTypes,
});

export default [
  registerHeader(cardCollectionHeader, { topology: cardTopology }),
  registerHeader(containerCollectionHeader, {
    topology: allTopologiesExcept(cardTopology, pageTopology),
  }),
];
