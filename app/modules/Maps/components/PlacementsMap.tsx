import { SomeNode } from 'link-lib';
import React from 'react';

import LinkLoader from '../../../components/Loading/LinkLoader';
import Suspense from '../../../components/Suspense';

import { Placement, SharedMapProps } from './ControlledMap';

const PlacementsMap = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Maps" */ '../async/components/PlacementsMap'),
);

export interface PlacementsMapProps extends SharedMapProps {
  overlayResource?: SomeNode;
  placements: Placement[] | SomeNode[];
}

const PlacementsMapLoader = (props: PlacementsMapProps): JSX.Element => {
  if (!__CLIENT__ || __TEST__) {
    return <LinkLoader />;
  }

  return (
    <Suspense>
      <PlacementsMap {...props} />
    </Suspense>
  );
};

export default PlacementsMapLoader;
