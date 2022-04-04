import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import Link from '../../../components/Link';
import { retrievePath } from '../../../helpers/iris';
import argu from '../../../ontology/argu';
import {
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
  containerTopology,
  fullResourceTopology,
  navbarTopology,
} from '../../../topologies';

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
