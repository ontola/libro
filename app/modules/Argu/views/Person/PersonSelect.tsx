import { InputAdornment } from '@mui/material';
import { NamedNode, isNamedNode } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useFields,
  useGlobalIds,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';

import ResourceBoundary from '../../../Common/components/ResourceBoundary';
import { selectTopology } from '../../../Form/topologies';
import ontola from '../../../Kernel/ontology/ontola';
import { useSelectItemStyles } from '../../../Form/topologies/Select';
import argu from '../../ontology/argu';

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
  onClick,
  onMouseDown,
  onMouseMove,
  role,
  style,
  wrapperProps,
}) => {
  const [itemClass] = useGlobalIds(rdfx.type);
  const classes = useSelectItemStyles();

  const defaultWrapperProps = () => ({
    'aria-selected': ariaSelected,
    'className': `${classes.selectItem} ${className} SelectPerson`,
    'element': element ?? 'li',
    id,
    onClick,
    onMouseDown,
    onMouseMove,
    role,
    style,
  });
  const labels = [schema.name, rdfs.label, foaf.name];

  const [label] = useFields(itemClass, ontola['forms/inputs/select/displayProp']);

  if (isNamedNode(label)) {
    labels.unshift(label);
  }

  return (
    <ResourceBoundary wrapperProps={wrapperProps ?? defaultWrapperProps()}>
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

export default register(PersonSelect);
