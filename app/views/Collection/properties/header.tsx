import * as as from '@ontologies/as';
import { SomeNode } from 'link-lib';
import { Property, Resource } from 'link-redux';
import React, { ReactNode } from 'react';

import CardHeader from '../../../components/Card/CardHeader';
import { useCollectionOptions } from '../../../components/Collection/CollectionProvider';
import { HeaderFloat } from '../../../components/Collection/HeaderFloat';
import { LoadingHidden } from '../../../components/Loading';
import { buildRegister } from '../../../helpers/buildRegister';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardTopology } from '../../../topologies/Card';
import ContainerHeader from '../../../topologies/Container/ContainerHeader';
import { pageTopology } from '../../../topologies/Page';
import { CollectionTypes } from '../types';

interface HeaderProps {
  children?: ReactNode;
  topologyCtx: SomeNode;
}

const cardCollectionHeader = (): JSX.Element | null => {
  const { hideHeader } = useCollectionOptions();

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

const containerCollectionHeader = (): JSX.Element | null => {
  const {
    headerButtons,
    hideHeader,
    originalCollection,
  } = useCollectionOptions();
  const filterRef = React.useRef(null);

  if (hideHeader) {
    return null;
  }

  return (
    <React.Fragment>
      <ContainerHeader
        float={<HeaderFloat filterContainerRef={filterRef} />}
      >
        {headerButtons}
        <Property label={as.name} />
        <Resource subject={originalCollection}>
          <Property
            label={ontola.favoriteAction}
            onLoad={LoadingHidden}
          />
        </Resource>
      </ContainerHeader>
      <div ref={filterRef} />
    </React.Fragment>
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
