// @flow
import React from 'react';
import { SearchContainer } from '../containers';
import { Container } from '../components';
import Helmet from 'react-helmet';

const Search = () => (
  <Container size="large">
    <Helmet title="Search" />
    <SearchContainer />
  </Container>
);

export default Search;
