
import * as rdfx from '@ontologies/rdf';
import {
  useGlobalIds,
  useProperty,
  useTopology,
  useView,
} from 'link-redux';
import { PropertyPropTypes } from 'link-redux/dist-types/components/Property';
import React from 'react';

import Renderer, { OtherProps } from './Renderer';

type AllPropertyProps = PropertyPropTypes & OtherProps;

/**
 * @deprecated
 */
const AllWithProperty = ({ label, ...other }: AllPropertyProps): JSX.Element => {
  const topology = useTopology();
  const types = useGlobalIds(rdfx.type);
  const view = useView(types, label, topology ?? undefined);
  const props = useProperty(label);

  return (
    <React.Fragment>
      {props.map((p, index) => (
        <Renderer
          key={`${p.value}-${index}`}
          label={label}
          value={p}
          view={view}
          {...other}
        />
      ))}
    </React.Fragment>
  );
};

export default AllWithProperty;
