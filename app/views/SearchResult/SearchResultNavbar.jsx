import { register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';

import { mediaQueries } from '../../components/shared/config';
import { NS } from '../../helpers/LinkedRenderStore';
import { values } from '../../helpers/ssr';
import { navbarTopology } from '../../topologies/Navbar';
import { NavbarLink } from '../../components';

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
          to={NS.app('search').value}
        />
      )}
    </MediaQuery>
  );
};

SearchResultNavbar.type = NS.argu('SearchResult');

SearchResultNavbar.topology = navbarTopology;

export default register(SearchResultNavbar);
