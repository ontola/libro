import { InputAdornment } from '@material-ui/core';
import { NamedNode, isNamedNode } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useResourceProperty,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';

import ResourceBoundary from '../../components/ResourceBoundary';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { selectTopology } from '../../topologies/Select';

interface PersonSelectProps {
  'aria-selected': boolean;
  className: string;
  element: string;
  id: string;
  itemClass: NamedNode;
  onClick: MouseEventHandler;
  onMouseDown: MouseEventHandler;
  onMouseMove: MouseEventHandler;
  role: string;
  style: any;
  wrapperProps: any;
}

const PersonSelect: FC<PersonSelectProps> = ({
  'aria-selected': ariaSelected,
  className,
  element,
  id,
  itemClass,
  onClick,
  onMouseDown,
  onMouseMove,
  role,
  style,
  wrapperProps,
}) => {
  const defaultWrapperProps = () => ({
    'aria-selected': ariaSelected,
    'className': `SelectItem ${className} SelectPerson`,
    'element': element || 'li',
    id,
    onClick,
    onMouseDown,
    onMouseMove,
    role,
    style,
  });
  const labels = [schema.name, rdfs.label, foaf.name];

  const [label] = useResourceProperty(itemClass, ontola['forms/inputs/select/displayProp']);

  if (isNamedNode(label)) {
    labels.unshift(label);
  }

  return (
    <ResourceBoundary wrapperProps={wrapperProps || defaultWrapperProps()}>
      <InputAdornment
        disablePointerEvents
        position="start"
      >
        <Property label={schema.image} />
      </InputAdornment>
      <Property label={labels} />
    </ResourceBoundary>
  );
};

PersonSelect.type = [
  schema.Person,
  argu.Page,
];

PersonSelect.topology = selectTopology;

PersonSelect.mapDataToProps = {
  itemClass: rdfx.type,
};

export default register(PersonSelect);
