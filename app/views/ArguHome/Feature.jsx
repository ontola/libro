import * as schema from '@ontologies/schema';
import {
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';
import './Feature.scss';

const Feature = () => {
  const image = useProperty(schema.name);
  const name = useProperty(schema.name);
  const text = useProperty(schema.name);

  return (
    <div className="Feature">
      <div className="Feature--image" style={{ backgroundImage: `url("${image.value}")` }} />
      <h3 className="Feature--title">
        <span>{name.value}</span>
      </h3>
      <p className="Feature--body">
        <span>{text.value}</span>
      </p>
    </div>
  );
};

Feature.type = argu.Feature;

Feature.topology = allTopologies;

export default register(Feature);
