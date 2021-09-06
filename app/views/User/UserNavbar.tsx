import { NamedNode } from '@ontologies/core';
import {
  Property,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import ResourceBoundary from '../../components/ResourceBoundary';
import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';

import { RegisteredTypes } from './types';

const UserNavbar = () => {
  const lrs = useLRS();
  const [mountAction] = useProperty(ontola.mountAction) as NamedNode[];

  React.useEffect(() => {
    if (mountAction) {
      lrs.exec(mountAction);
    }
  }, [mountAction]);

  return (
    <ResourceBoundary>
      <Property
        label={ontola.actor}
        onClick={(e: MouseEvent) => {
          if (e) {
            e.preventDefault();
          }

          lrs.exec(app.ns('actions/menu/toggle'));
        }}
      />
    </ResourceBoundary>
  );
};

UserNavbar.type = RegisteredTypes;

UserNavbar.topology = navbarTopology;

export default register(UserNavbar);
