import { NamedNode } from '@ontologies/core';
import {
  FC,
  Property,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import ResourceBoundary from '../../components/ResourceBoundary';
import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';

import { RegisteredTypes } from './types';

interface UserNavbarProps {
  mountAction?: NamedNode;
}

const UserNavbar: FC<UserNavbarProps> = ({
  mountAction,
}) => {
  const lrs = useLRS();

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

UserNavbar.mapDataToProps = {
  mountAction: ontola.mountAction,
};

export default register(UserNavbar);
