import { register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';

import NavbarLink from '../../components/NavbarLink';
import { mediaQueries } from '../../components/shared/config';
import { values } from '../../helpers/ssr';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import { navbarTopology } from '../../topologies/Navbar';

const SearchResultNavbar = () => {
  const label = (
    <FormattedMessage
      defaultMessage="Search"
      id="https://app.argu.co/i18n/navbar/search"
    />
  );

  return (
    <MediaQuery query={mediaQueries.smallAndAbove} values={values}>
      {(matches) => (
        <NavbarLink
          icon="search"
          label={matches && label}
          to={app.search.value}
        />
      )}
    </MediaQuery>
  );
};

SearchResultNavbar.type = argu.SearchResult;

SearchResultNavbar.topology = navbarTopology;

export default register(SearchResultNavbar);
