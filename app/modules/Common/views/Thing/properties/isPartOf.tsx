import * as schema from '@ontologies/schema';
import {
  PropertyProps,
  Resource,
  register,
} from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';

import { parentProps } from '../../../../Core/ontology/app';
import BreadcrumbsBar from '../../../topologies/BreadcrumbsBar';
import { containerTopology } from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

const IsPartOfContainer = ({
  linkedProp,
  subject,
}: PropertyProps & SubjectProp): JSX.Element => (
  <BreadcrumbsBar>
    <Resource
      first
      parent={subject}
      subject={linkedProp}
    />
  </BreadcrumbsBar>
);

IsPartOfContainer.type = schema.Thing;

IsPartOfContainer.property = parentProps;

IsPartOfContainer.topology = [
  containerTopology,
  fullResourceTopology,
];

export default register(IsPartOfContainer);
