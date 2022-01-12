import {
  Resource,
  array,
  useIds,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { frontendIRI } from '../../ontology/app';
import ontola from '../../ontology/ontola';
import AppMenu from '../../topologies/AppMenu';
import { navBarMessages } from '../../translations/messages';
import { Trigger } from '../DropdownMenu/TriggerButton';
import { TriggerButtonNavBar } from '../DropdownMenu/TriggerButtonNavBar';

const trigger: Trigger = (props) => (
  <TriggerButtonNavBar
    {...props}
    icon="cogs"
  >
    <FormattedMessage {...navBarMessages.manageOrganisationButton} />
  </TriggerButtonNavBar>
);

export const ManageOrganisationMenu = (): JSX.Element | null => {
  const [manageMenu] = useIds(frontendIRI, ontola.manageMenu);
  const menuItems = useIds(manageMenu, array(ontola.menuItems));

  if (menuItems?.length === 0) {
    return null;
  }

  return (
    <AppMenu trigger={trigger}>
      {({ handleClose }) => menuItems.map((iri) => (
        <Resource
          childProps={{
            onClose: handleClose,
          }}
          key={iri.value}
          subject={iri}
        />
      ))}
    </AppMenu>
  );
};
