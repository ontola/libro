import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import {
  Heading,
  LDLink,
} from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Name = ({ linkedProp }) => <Heading data-test="Thing-name" size="1">{linkedProp}</Heading>;

Name.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    Name,
    NS.schema('Thing'),
    [
      NS.schema('name'),
      NS.rdfs('label'),
      NS.foaf('name'),
    ],
    [undefined, NS.argu('collection'), NS.argu('parent'), NS.argu('section')]
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <span data-test="Thing-name-sidebar">{linkedProp}</span>,
    NS.schema('Thing'),
    [
      NS.schema('name'),
      NS.rdfs('label'),
      NS.foaf('name'),
    ],
    NS.argu('sidebar')
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <LDLink data-test="Thing-name-inline">{linkedProp}</LDLink>,
    NS.schema('Thing'),
    [
      NS.schema('name'),
      NS.rdfs('label'),
      NS.foaf('name'),
    ],
    NS.argu('inline')
  ),
];
