import schema from '@ontologies/schema';
import {
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import './Customer.scss';
import Link from '../../components/Link';
import GridItem from '../../components/Grid/GridItem';
import argu from '../../ontology/argu';
import { allTopologies } from '../../topologies';

const Customer = ({
  url,
  name,
  image,
}) => {
  const Wrapper = url ? Link : React.Fragment;

  return (
    <GridItem>
      <Wrapper
        style={{ width: '100%' }}
        to={url?.value}
      >
        <div
          className="Customer"
          style={{ backgroundImage: `url("${image.value}")` }}
          title={name.value}
        />
      </Wrapper>
    </GridItem>
  );
};

Customer.type = argu.Customer;

Customer.topology = allTopologies;

Customer.mapDataToProps = {
  image: schema.image,
  name: schema.name,
  url: schema.url,
};

Customer.propTypes = {
  image: linkType,
  name: linkType,
  url: linkType,
};

export default register(Customer);
