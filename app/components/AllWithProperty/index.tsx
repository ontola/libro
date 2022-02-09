import { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import { SomeNode } from 'link-lib';
import {
  Resource,
  useGlobalIds,
  useProperty,
  useTopology,
  useView, 
} from 'link-redux';
import { PropertyPropTypes } from 'link-redux/dist-types/components/Property';
import React from 'react';

interface AllPropertyProps extends PropertyPropTypes {
  collectionDisplay?: NamedNode;
  measures?: SomeNode[];
}

const AllWithProperty = ({ label, ...other }: AllPropertyProps): JSX.Element => {
  const topology = useTopology();
  const types = useGlobalIds(rdfx.type);
  const View = useView(types, label, topology ?? undefined) ?? Resource;
  const props = useProperty(label);

  return (
    <React.Fragment>
      {props.map((p) => (
        <View
          key={p.value}
          linkedProp={p}
          subject={p}
          {...other}
        />
      ))}
    </React.Fragment>
  );
};

export default AllWithProperty;
