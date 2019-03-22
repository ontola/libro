import {
  register,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { NS } from '../../helpers/LinkedRenderStore';
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
    <NavbarLink
      icon="search"
      label={label}
      to={NS.app('search').value}
    />
  );
};

SearchResultNavbar.type = NS.argu('SearchResult');

SearchResultNavbar.topology = navbarTopology;

export default register(SearchResultNavbar);
