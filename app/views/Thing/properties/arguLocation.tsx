import { makeStyles } from '@material-ui/styles';
import rdf, {
  isNamedNode,
  isNode,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useDataFetching,
  useIds,
  useLRS,
} from 'link-redux';
import React from 'react';

import MapView, {
  FeatureSelectCallback,
  MapVariant,
  NavigateCallback,
} from '../../../modules/MapView/components/MapView';
import { isResource } from '../../../helpers/types';
import { useContainerToArr } from '../../../hooks/useContainerToArr';
import useCreateChildHandler from '../../../hooks/useCreateChildHandler';
import app from '../../../ontology/app';
import argu from '../../../ontology/argu';
import { LibroTheme } from '../../../themes/themes';
import { containerTopology } from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { gridTopology } from '../../../topologies/Grid';
import { mainBodyTopology } from '../../../topologies/MainBody';

export interface ArguLocationProps {
  linkedProp: SomeNode;
  gutterTop?: boolean
  variant?: MapVariant
}

const gutterAmount = 5;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  gutterTop: {
    marginTop: theme.spacing(gutterAmount),
  },
}));

const ArguLocation: FC<ArguLocationProps> = ({
  linkedProp,
  gutterTop,
  variant = MapVariant.Default,
}) => {
  const lrs = useLRS();
  const classes = useStyles();

  const [childrenPlacements] = useIds(argu.childrenPlacements);
  const onMapClick = useCreateChildHandler();

  useDataFetching(childrenPlacements);
  const [children, childrenLoading] = useContainerToArr(childrenPlacements);

  const onSelect = React.useCallback<FeatureSelectCallback>((feature) => {
    const id = feature?.getId();

    if (id) {
      const partOf = lrs.getResourceProperty(
        isResource(id) ? id : rdf.namedNode(id), schema.isPartOf,
      );

      if (partOf) {
        lrs.actions.ontola.showDialog(partOf);
      }
    }
  }, []);

  const handleNavigate = React.useCallback<NavigateCallback>((resource) => (
    lrs.actions.ontola.navigate(isNamedNode(resource) ? resource : app.ns('#'))
  ), [lrs]);

  const placements = React.useMemo(() => (
    [
      linkedProp,
      ...children.filter(isNode).filter((child) => child !== linkedProp),
    ].filter(Boolean)
  ), [linkedProp, children]);

  const wrapperClass = clsx({
    [classes.gutterTop]: gutterTop,
  });

  if (!isResource(linkedProp)) {
    return null;
  }

  if (childrenLoading) {
    return (
      <div className={wrapperClass}>
        <MapView
          key="loading-map"
          placements={[linkedProp]}
          variant={variant}
        />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <MapView
        navigate={handleNavigate}
        placements={placements}
        variant={variant}
        onMapClick={onMapClick}
        onSelect={onSelect}
      />
    </div>
  );
};

ArguLocation.type = schema.Thing;

ArguLocation.property = schema.location;

ArguLocation.topology = [
  containerTopology,
  fullResourceTopology,
  mainBodyTopology,
  gridTopology,
];

export default register(ArguLocation);
