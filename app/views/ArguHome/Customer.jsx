import schema from '@ontologies/schema';
import {
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';
import './Customer.scss';
import GridItem from '../../components/Grid/GridItem';

const Customer = ({ name, image }) => (
  <GridItem>
    <div
      className="Customer"
      style={{ backgroundImage: `url("${image.value}")` }}
      title={name.value}
    />
  </GridItem>
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
