import { register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { navbarTopology } from '../../../NavBar/topologies';
import app from '../../ontology/app';
import ontola from '../../../Kernel/ontology/ontola';
import { NavbarLinkLink } from '../../../NavBar/components/NavbarLink';

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
