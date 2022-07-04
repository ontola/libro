import {
  NamedNode,
  Node,
  isNode,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  LinkReduxLRSType,
  useDataFetching,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React from 'react';

import fa4 from '../../../../ontology/fa4';
import { tryParseFloat } from '../../../Common/lib/numbers';
import { entityIsLoaded } from '../../../Kernel/lib/data';
import ontola from '../../../Kernel/ontology/ontola';
import { Placement } from '../../components/ControlledMap';

const imageForPlacement = (node: SomeNode, lrs: LinkReduxLRSType): NamedNode =>
  lrs.getResourceProperty(node, schema.image) ?? fa4.ns('map-marker');

const toPlacement = (lrs: LinkReduxLRSType, node: SomeNode): Placement => ({
  id: node.value,
  image: imageForPlacement(node, lrs),
  lat: tryParseFloat(lrs.getResourceProperty(node, schema.latitude))!,
  lon: tryParseFloat(lrs.getResourceProperty(node, schema.longitude))!,
  zoomLevel: tryParseFloat(lrs.getResourceProperty(node, ontola.zoomLevel)),
});

const someLoading = (lrs: LinkReduxLRSType, records: Node[]) =>
  records.some((record: SomeNode) => !entityIsLoaded(lrs, record));

export const usePlacementIds = (placementIds: Node[] | Placement[]): [data: Placement[], loading: boolean] => {
  const lrs = useLRS();
  const [loading, setLoading] = React.useState(true);
  const [placements, setPlacements] = React.useState<Placement[]>([]);
  const [ids, setIds] = React.useState<Node[]>([]);
  const update = useDataInvalidation(ids);
  useDataFetching(ids);

  React.useEffect(() => {
    const dependencies = [];
    const nextPlacements = [];

    for (const placementId of placementIds) {
      if (isNode(placementId)) {
        dependencies.push(placementId);

        if (entityIsLoaded(lrs, placementId)) {
          nextPlacements.push(toPlacement(lrs, placementId));
        }
      } else {
        nextPlacements.push(placementId);
      }
    }

    setIds(dependencies);
    setPlacements(nextPlacements);

    setLoading(someLoading(lrs, dependencies));
  }, [placementIds, update]);

  return [placements, loading];
};
