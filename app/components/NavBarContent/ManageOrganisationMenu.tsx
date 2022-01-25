import * as schema from '@ontologies/schema';
import {
  array,
  useGlobalIds,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import { NAME_PREDICATES } from '../../helpers/metaData';
import { frontendIRI } from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { NavbarLinkLink } from '../NavbarLink';

export const ManageOrganisationMenu = (): JSX.Element | null => {
  const [setingsMenu] = useIds(frontendIRI, ontola.settingsMenu);
  const [name] = useStrings(setingsMenu, NAME_PREDICATES);
  const [image] = useGlobalIds(setingsMenu, schema.image);
  const menuItems = useIds(setingsMenu, array(ontola.menuItems));
  const icon = image && normalizeFontAwesomeIRI(image);

  if (menuItems?.length === 0) {
    return null;
  }

  return (
    <NavbarLinkLink
      icon={icon}
      label={name}
      title={name}
      to={setingsMenu.value}
    />
  );
};
