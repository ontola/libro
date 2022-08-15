import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import Link from '../../../../Common/components/Link';
import { retrievePath } from '../../../../Common/lib/iris';
import {
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
  containerTopology,
  fullResourceTopology,
} from '../../../../Common/topologies';
import { navbarTopology } from '../../../../NavBar/topologies';
import argu from '../../../ontology/argu';

interface TargetProps extends PropertyProps {
  onClick: () => void;
}

const Target: FC<TargetProps> = ({
  children = null,
  linkedProp,
  onClick,
}) => (
  <Link
    style={{
      display: 'flex',
      flexGrow: 1,
      paddingTop: '.5em',
    }}
    to={retrievePath(linkedProp.value)!}
    onClick={onClick}
  >
    {children}
  </Link>
);

Target.type = argu.Notification;

Target.property = schema.target;

Target.topology = [
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
  containerTopology,
  navbarTopology,
  fullResourceTopology,
];

export default register(Target);
