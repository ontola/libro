import * as schema from '@ontologies/schema';
import {
  PropertyProps,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { detailsBarTopology } from '../../../topologies';

interface CreatorProps extends PropertyProps {
  children: React.ReactNode,
  hideName: boolean,
}

const Creator = ({
  children,
  hideName,
  linkedProp,
}: CreatorProps): JSX.Element => (
  <Resource
    hideName={hideName}
    subject={linkedProp}
    titleKey="postedBy"
  >
    {children}
  </Resource>
);

Creator.type = schema.Thing;

Creator.property = schema.creator;

Creator.topology = detailsBarTopology;

export default register(Creator);
