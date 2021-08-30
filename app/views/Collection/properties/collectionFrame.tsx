import rdf, { SomeTerm } from '@ontologies/core';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import CollectionFrame from '../../../components/Collection/CollectionFrame';
import { useCollectionOptions } from '../../../components/Collection/CollectionProvider';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import Container, {
  LargeContainer,
  containerTopology,
} from '../../../topologies/Container';
import { alertDialogTopology } from '../../../topologies/Dialog';
import { gridTopology } from '../../../topologies/Grid';
import { mainBodyTopology } from '../../../topologies/MainBody';
import { pageTopology } from '../../../topologies/Page';
import { sideBarTopology } from '../../../topologies/SideBar';
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
