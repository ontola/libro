import {
  Property,
  register,
  useAction,
  useGlobalIds,
} from 'link-redux';
import React from 'react';

import ResourceBoundary from '../../components/ResourceBoundary';
import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';

import { RegisteredTypes } from './types';

const UserNavbar = () => {
  const [mountAction] = useGlobalIds(ontola.mountAction);
  const onMountAction = useAction(mountAction);
  const toggleMenu = useAction(app.ns('actions/menu/toggle'));

  React.useEffect(() => {
    if (mountAction) {
      onMountAction();
    }
  }, [onMountAction]);

  return (
    <ResourceBoundary>
      <Property
        label={ontola.actor}
        onClick={(e: MouseEvent) => {
          if (e) {
            e.preventDefault();
          }

          toggleMenu();
        }}
      />
    </ResourceBoundary>
  );
};

UserNavbar.type = RegisteredTypes;

UserNavbar.topology = navbarTopology;

export default register(UserNavbar);
