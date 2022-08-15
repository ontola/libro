import { makeStyles } from '@mui/styles';
import rdf, {
  NamedNode,
  isNamedNode,
  isNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
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

import { Navigate, ShowDialog } from '../../../../Common/middleware/actions';
import {
  containerTopology,
  fullResourceTopology,
  gridTopology,
  mainBodyTopology,
} from '../../../../Common/topologies';
import { LibroTheme } from '../../../../Kernel/lib/themes';
import { isResource } from '../../../../Kernel/lib/typeCheckers';
import { useContainerToArr } from '../../../../Kernel/hooks/useContainerToArr';
import app from '../../../../Common/ontology/app';
import {
  FeatureSelectCallback,
  MapVariant,
  NavigateCallback,
} from '../../../../Map/components/ControlledMap';
import PlacementsMap from '../../../../Map/components/PlacementsMap';
import useCreateChildHandler from '../../../hooks/useCreateChildHandler';
import argu from '../../../ontology/argu';

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

const openFullTypes = [argu.Project];

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
  const [children, childrenLoading] = useContainerToArr<SomeNode>(childrenPlacements);

  const onSelect = React.useCallback<FeatureSelectCallback>((feature) => {
    const id = feature?.getId();

    if (id) {
      const iri = isResource(id) ? id : rdf.namedNode(id);

      const partOf = lrs.getResourceProperty(iri, schema.isPartOf);

      if (isNode(partOf)) {
        const partOfType = lrs.getResourceProperty(partOf, rdfx.type);

        if (isNamedNode(partOfType) && openFullTypes.includes(partOfType)) {
          lrs.actions.get(Navigate)(partOf as NamedNode);
        } else {
          lrs.actions.get(ShowDialog)(partOf);
        }
      }
    }
  }, []);

  const handleNavigate = React.useCallback<NavigateCallback>((resource) => (
    lrs.actions.get(Navigate)(isNamedNode(resource) ? resource : app.ns('#'))
  ), [lrs]);

  const placements = children.length > 0 ? children : [linkedProp];

  const wrapperClass = clsx({
    [classes.gutterTop]: gutterTop,
  });

  if (!isResource(linkedProp)) {
    return null;
  }

  if (childrenLoading) {
    return (
      <div className={wrapperClass}>
        <PlacementsMap
          key="loading-map"
          placements={[linkedProp]}
          variant={variant}
        />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <PlacementsMap
        navigate={handleNavigate}
        placements={placements}
        variant={variant}
        onInteraction={onMapClick}
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
