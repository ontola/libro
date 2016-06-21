// @flow
import React from 'react';
import { SearchContainer } from '../containers';
import Helmet from 'react-helmet';

const Search = () => (
  <div>
    <Helmet title="Search" />
    <SearchContainer />
  </div>
);

export default Search;
