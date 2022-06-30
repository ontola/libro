import * as schema from '@ontologies/schema';
import {
  array,
  useGlobalIds,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import { normalizeFontAwesomeIRI } from '../../../Common/lib/iris';
import { NAME_PREDICATES } from '../../../Common/lib/metaData';
import { frontendIRI } from '../../../Core/ontology/app';
import ontola from '../../../Core/ontology/ontola';
import { NavbarLinkLink } from '../NavbarLink';

export const ManageOrganisationMenu = (): JSX.Element | null => {
  const [settingsMenu] = useIds(frontendIRI, ontola.settingsMenu);
  const [name] = useStrings(settingsMenu, NAME_PREDICATES);
  const [image] = useGlobalIds(settingsMenu, schema.image);
  const menuItems = useIds(settingsMenu, array(ontola.menuItems));
  const icon = image && normalizeFontAwesomeIRI(image);

  if (!menuItems?.length) {
    return null;
  }

  return (
    <NavbarLinkLink
      icon={icon}
      label={name}
      title={name}
      to={settingsMenu.value}
    />
  );
};
