// @flow
import React from 'react';
import { SearchContainer } from '../containers';
import { Page } from '../components';
import Helmet from 'react-helmet';

const Search = () => (
  <Page type="full">
    <Helmet title="Search" />
    <SearchContainer />
  </Page>
);

export default Search;
