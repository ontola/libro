import * as schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';
import { inlineTopology } from '../../topologies/Inline';
import './Feature.scss';

const Feature = ({ image }) => (
  <div className="Feature">
    <div className="Feature--image" style={{ backgroundImage: `url("${image.value}")` }} />
    <h3 className="Feature--title"><Property label={schema.name} topology={inlineTopology} /></h3>
    <p className="Feature--body"><Property label={schema.text} topology={inlineTopology} /></p>
  </div>
);

Feature.type = argu.Feature;

Feature.topology = allTopologies;

Feature.mapDataToProps = {
  image: schema.image,
};

Feature.propTypes = {
  image: linkType,
};

export default register(Feature);
