import rdf, { SomeTerm } from '@ontologies/core';
import { FC, register } from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../../../../topologies';
import Container, { LargeContainer, containerTopology } from '../../../../Common/topologies/Container';
import { alertDialogTopology } from '../../../../Common/topologies/Dialog';
import { gridTopology } from '../../../../Common/topologies/Grid';
import { mainBodyTopology } from '../../../../Common/topologies/MainBody';
import { pageTopology } from '../../../../Common/topologies/Page';
import { sideBarTopology } from '../../../../Common/topologies/SideBar';
import ontola from '../../../../Core/ontology/ontola';
import { useCollectionOptions } from '../../../components/CollectionContext';
import CollectionFrame from '../../../components/CollectionFrame';
import { CollectionTypes } from '../types';

interface CollectionFrameProps {
  linkedProp: SomeTerm;
  onDone?: () => void;
}

const LARGE_CONTAINER_DISPLAYS = [
  rdf.id(ontola.ns('collectionDisplay/grid')),
  rdf.id(ontola.ns('collectionDisplay/settingsTable')),
  rdf.id(ontola.ns('collectionDisplay/table')),
];

const DefaultCollectionFrame: FC<CollectionFrameProps> = () => {
  const { collectionDisplay } = useCollectionOptions();

  const Wrapper = (LARGE_CONTAINER_DISPLAYS.includes(rdf.id(collectionDisplay))) ? LargeContainer : Container;

  return (
    <CollectionFrame
      Wrapper={Wrapper}
    />
  );
};

DefaultCollectionFrame.type = CollectionTypes;
DefaultCollectionFrame.topology = allTopologiesExcept(
  alertDialogTopology,
  containerTopology,
  gridTopology,
  mainBodyTopology,
  pageTopology,
  sideBarTopology,
);
DefaultCollectionFrame.property = ontola.collectionFrame;

const WrappedCollectionFrame: FC<CollectionFrameProps> = () => (
  <CollectionFrame
    Wrapper={React.Fragment}
  />
);

WrappedCollectionFrame.type = CollectionTypes;
WrappedCollectionFrame.topology = [
  alertDialogTopology,
  containerTopology,
  gridTopology,
  mainBodyTopology,
  sideBarTopology,
];
WrappedCollectionFrame.property = ontola.collectionFrame;

export default [
  register(DefaultCollectionFrame),
  register(WrappedCollectionFrame),
];
