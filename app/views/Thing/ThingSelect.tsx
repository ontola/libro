import { NamedNode } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  register,
  useGlobalIds,
  useLink,
} from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React, { CSSProperties } from 'react';

import ResourceBoundary from '../../components/ResourceBoundary';
import ontola from '../../ontology/ontola';
import { selectTopology } from '../../topologies/Select';

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
  const defaultWrapperProps = () => ({
    'aria-selected': ariaSelected,
    className: `SelectItem ${className}`,
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

  if (labelProp) {
    labels.unshift(labelProp);
  }

  const { label } = useLink({ label: labels });

  return (
    <ResourceBoundary wrapperProps={wrapperProps ?? defaultWrapperProps()}>
      {(label ?? subject).value}
    </ResourceBoundary>
  );
};

ThingSelect.type = schema.Thing;

ThingSelect.topology = selectTopology;

export default register(ThingSelect);