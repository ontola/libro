import schema from '@ontologies/schema';
import {
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';
import './Customer.scss';

const Customer = ({ name, image }) => (
  <div
    className="Customer"
    style={{ backgroundImage: `url("${image.value}")` }}
    title={name.value}
  />
);

Customer.type = argu.Customer;

Customer.topology = allTopologies;

Customer.mapDataToProps = {
  image: schema.image,
  name: schema.name,
};

Customer.propTypes = {
  image: linkType,
  name: linkType,
};

export default register(Customer);
