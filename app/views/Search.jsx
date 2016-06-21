// @flow
import React from 'react';
import { SearchContainer } from '../containers';
import Helmet from 'react-helmet';

class Search extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Search" />
        <SearchContainer />
      </div>
    );
  }
}

export default Search;
