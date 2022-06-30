import { register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import app from '../../../Core/ontology/app';
import ontola from '../../../Core/ontology/ontola';
import { NavbarLinkLink } from '../../../NavBar/components/NavbarLink';
import { navbarTopology } from '../../../NavBar/topologies/Navbar';

const SearchResultNavbar = (): JSX.Element => {
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
      title={label.props.defaultMessage}
      to={app.search.value}
    />
  );
};

SearchResultNavbar.type = ontola.SearchResult;

SearchResultNavbar.topology = navbarTopology;

export default register(SearchResultNavbar);
