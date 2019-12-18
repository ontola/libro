import { register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { NavbarLinkLink } from '../../components/NavbarLink';
import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';

const SearchResultNavbar = () => {
  const label = (
    <FormattedMessage
      defaultMessage="Search"
      id="https://app.argu.co/i18n/navbar/search"
    />
  );

  return (
    <NavbarLinkLink
      icon="search"
      label={label}
      to={app.search.value}
    />
  );
};

SearchResultNavbar.type = ontola.SearchResult;

SearchResultNavbar.topology = navbarTopology;

export default register(SearchResultNavbar);
