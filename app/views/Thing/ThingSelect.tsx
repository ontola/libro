import { NamedNode } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useGlobalIds,
  useStrings,
} from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React, { CSSProperties } from 'react';

import ResourceBoundary from '../../components/ResourceBoundary';
import ontola from '../../ontology/ontola';
import { selectTopology } from '../../topologies';
import { useSelectItemStyles } from '../../topologies/Select';

interface ThingSelectProps extends SubjectProp {
  'aria-selected': boolean;
  className: string;
  element: string;
  id: string;
  itemClass: NamedNode,
  onClick: React.MouseEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseMove: React.MouseEventHandler;
  role: string;
  style: CSSProperties;
  wrapperProps: unknown;
}

const ThingSelect = ({
  'aria-selected': ariaSelected,
  className,
  element,
  id,
  onClick,
  onMouseDown,
  onMouseMove,
  role,
  style,
  subject,
  wrapperProps,
}: ThingSelectProps) => {
  const classes = useSelectItemStyles();

  const defaultWrapperProps = () => ({
    'aria-selected': ariaSelected,
    className: `${classes.selectItem} ${className}`,
    element: element ?? 'li',
    id,
    onClick,
    onMouseDown,
    onMouseMove,
    role,
    style,
  });

  const labels = [schema.name, rdfs.label, foaf.name];

  const [itemClass] = useGlobalIds(rdfx.type);
  const [labelProp] = useGlobalIds(itemClass, ontola['forms/inputs/select/displayProp']);
  const [image] = useGlobalIds(schema.image);

  if (labelProp) {
    labels.unshift(labelProp);
  }

  const [label] = useStrings(labels);

  return (
    <ResourceBoundary wrapperProps={wrapperProps ?? defaultWrapperProps()}>
      {image && (
        <div className={classes.image}>
          <Property label={schema.image} />
        </div>
      )}
      {label ?? subject?.value}
    </ResourceBoundary>
  );
};

ThingSelect.type = schema.Thing;

ThingSelect.topology = selectTopology;

export default register(ThingSelect);
