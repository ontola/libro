import * as as from '@ontologies/as';
import { NamedNode, SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { Property } from 'link-redux';
import React, { ReactNode } from 'react';

import CardHeader from '../../../components/Card/CardHeader';
import CollectionCreateActionButton from '../../../components/Collection/CollectionCreateActionButton';
import ContainerHeader from '../../../components/Container/ContainerHeader';
import { buildRegister } from '../../../helpers/buildRegister';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardTopology } from '../../../topologies/Card';
import Container, { LargeContainer, containerTopology } from '../../../topologies/Container';
import { pageTopology } from '../../../topologies/Page';
import { CollectionTypes } from '../types';

interface HeaderFloatProps {
  hidePagination?: boolean;
  omniform?: boolean;
  setCurrentPage?: (page: NamedNode) => void;
}

interface HeaderProps {
  children?: ReactNode;
  collectionDisplay: SomeTerm;
  omniform: boolean,
  setCurrentPage: (page: NamedNode) => void;
  subject: SomeNode;
  topologyCtx: SomeNode;
}

export const HeaderFloat = ({
  hidePagination,
  omniform,
  setCurrentPage,
}: HeaderFloatProps): JSX.Element => {
  const renderPagination = setCurrentPage && !hidePagination;

  return (
    <React.Fragment>
      {renderPagination && <Property label={ontola.filterFields} setCurrentPage={setCurrentPage} />}
      {renderPagination && <Property label={ontola.sortOptions} setCurrentPage={setCurrentPage} />}
      <CollectionCreateActionButton omniform={omniform} />
    </React.Fragment>
  );
};

const cardCollectionHeader = (props: HeaderProps): JSX.Element => (
  <CardHeader float={<HeaderFloat {...props} />}>
    <Property label={as.name} />
    <div>
      <Property
        label={ontola.collectionFilter}
        limit={Infinity}
        setCurrentPage={props.setCurrentPage}
      />
    </div>
  </CardHeader>
);

const containerCollectionHeader = (props: HeaderProps): JSX.Element => {
  const {
    collectionDisplay,
    setCurrentPage,
    topologyCtx,
  } = props;
  let Wrapper = React.Fragment as React.ElementType;
  if (collectionDisplay === ontola['collectionDisplay/default'] && topologyCtx !== containerTopology) {
    Wrapper = Container;
  }
  if (collectionDisplay === ontola['collectionDisplay/grid'] && topologyCtx !== containerTopology) {
    Wrapper = LargeContainer;
  }

  return (
    <Wrapper>
      <ContainerHeader float={<HeaderFloat {...props} />}>
        <Property label={as.name} />
        <div>
          <Property
            label={ontola.collectionFilter}
            limit={Infinity}
            setCurrentPage={setCurrentPage}
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
