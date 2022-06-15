import * as foaf from '@ontologies/foaf';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useGlobalIds,
  useIds,
} from 'link-redux';
import React from 'react';

import ontola from '../../../../ontology/ontola';
import { radioGroupTopology } from '../../../../topologies';
import ResourceBoundary from '../../../Core/components/ResourceBoundary';

interface ThingRadioGroupProps {
  itemClass: unknown,
  style: unknown,
  wrapperProps: unknown,
}

const ThingRadioGroup = ({
  wrapperProps,
}: ThingRadioGroupProps) => {
  const [itemClass] = useIds(rdfx.type);
  const [label] = useGlobalIds(itemClass, ontola['forms/inputs/select/displayProp']);

  const labels = [schema.name, rdfs.label, foaf.name];

  if (label) {
    labels.unshift(label);
  }

  return (
    <ResourceBoundary
      element="span"
      wrapperProps={wrapperProps}
    >
      <Property label={labels} />
    </ResourceBoundary>
  );
};

ThingRadioGroup.type = schema.Thing;

ThingRadioGroup.topology = radioGroupTopology;

export default register(ThingRadioGroup);
