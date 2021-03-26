import * as as from '@ontologies/as';
import { SomeNode } from 'link-lib';
import { Property } from 'link-redux';
import React, { ReactNode } from 'react';

import CardHeader from '../../../components/Card/CardHeader';
import CollectionCreateActionButton from '../../../components/Collection/CollectionCreateActionButton';
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
  subject: SomeNode;
  topologyCtx: SomeNode;
}

export const HeaderFloat = (): JSX.Element => {
  const { hidePagination } = useCollectionOptions();
  const renderPagination = !hidePagination;

  return (
    <React.Fragment>
      {renderPagination && <Property label={ontola.filterFields} />}
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

  return (
    <CardHeader float={<HeaderFloat />}>
      <Property label={as.name} />
      <div>
        <Property
          label={ontola.collectionFilter}
          limit={Infinity}
        />
      </div>
    </CardHeader>
  );
};

const containerCollectionHeader = ({
  hideHeader,
  topologyCtx,
}: HeaderProps): JSX.Element | null => {
  const { collectionDisplay } = useCollectionOptions();

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
      <ContainerHeader float={<HeaderFloat />}>
        <Property label={as.name} />
        <div>
          <Property
            label={ontola.collectionFilter}
            limit={Infinity}
          />
        </div>
      </ContainerHeader>
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
