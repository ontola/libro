import PropTypes from 'prop-types';
import React from 'react';
import { LinkedObjectContainer } from 'link-redux';

import {
  Container,
} from 'components';

import { currentLocation } from '../../helpers/paths';


const propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
  }),
};

const LinkedPerson = ({ location }) => (
  <Container>
    <LinkedObjectContainer object={currentLocation(location)} />
  </Container>
);

LinkedPerson.propTypes = propTypes;

export default LinkedPerson;
