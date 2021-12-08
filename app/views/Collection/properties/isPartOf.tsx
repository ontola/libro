import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import BreadcrumbsBar from '../../../components/Breadcrumbs/BreadcrumbsBar';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { CollectionTypes } from '../types';

export interface IsPartOfProps {
  linkedProp: SomeTerm,
}

const IsPartOfPage: FC<IsPartOfProps> = ({ linkedProp }) => (
  <BreadcrumbsBar>
    <Resource
      first
      subject={linkedProp}
    />
  </BreadcrumbsBar>
);

IsPartOfPage.type = CollectionTypes;

IsPartOfPage.property = schema.isPartOf;

IsPartOfPage.topology = fullResourceTopology;

export default register(IsPartOfPage);
