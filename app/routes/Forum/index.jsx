import {
  Property,
  Resource,
  Type,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { currentLocation } from '../../helpers/paths';
import argu from '../../ontology/argu';
import Container from '../../topologies/Container';

const propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
  }),
};

const Forum = ({ location }) => (
  <Container>
    <Resource subject={currentLocation(location)}>
      <Type />
      <Property label={argu.ns('questions')} />
      <Property label={argu.ns('motions')} />
    </Resource>
  </Container>
);

Forum.propTypes = propTypes;

export default Forum;
