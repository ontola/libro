import {
  FC,
  Property,
  register,
  useActionById,
  useGlobalIds,
} from 'link-redux';
import React from 'react';

import { PersonNavbarProps } from '../../../Argu/views/Person/PersonNavbar';
import ResourceBoundary from '../../../Common/components/ResourceBoundary';
import ontola from '../../../Kernel/ontology/ontola';
import { navbarTopology } from '../../../NavBar/topologies/Navbar';

import { RegisteredTypes } from './types';

const UserNavbar: FC<PersonNavbarProps> = (props) => {
  const [mountAction] = useGlobalIds(ontola.mountAction);
  const onMountAction = useActionById(mountAction);

  React.useEffect(() => {
    if (mountAction) {
      onMountAction();
    }
  }, [onMountAction]);

  return (
    <ResourceBoundary>
      <Property
        label={ontola.actor}
        {...props}
      />
    </ResourceBoundary>
  );
};

UserNavbar.type = RegisteredTypes;

UserNavbar.topology = navbarTopology;

export default register(UserNavbar);
