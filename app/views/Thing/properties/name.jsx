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

const Name = ({ linkedProp }) => (
  <Heading data-test="Thing-name" size="1">{linkedProp.value}</Heading>
);

Name.propTypes = propTypes;

const ThingNameHeader = ({ linkedProp }) => (
  <Heading data-test="Thing-name-header" size="1">{linkedProp.value}</Heading>
);

ThingNameHeader.propTypes = propTypes;

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
    ({ linkedProp }) => <span data-test="Thing-name-sidebar">{linkedProp.value}</span>,
    NS.schema('Thing'),
    [
      NS.schema('name'),
      NS.rdfs('label'),
      NS.foaf('name'),
    ],
    NS.argu('sidebar')
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <LDLink data-test="Thing-name-inline">{linkedProp.value}</LDLink>,
    NS.schema('Thing'),
    [
      NS.schema('name'),
      NS.rdfs('label'),
      NS.foaf('name'),
    ],
    NS.argu('inline')
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <LDLink><Heading size="3">{linkedProp.value}</Heading></LDLink>,
    NS.schema('Thing'),
    [
      NS.schema('name'),
      NS.rdfs('label'),
      NS.foaf('name'),
    ],
    [
      NS.argu('card'),
      NS.argu('collection'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <Heading size="2">{linkedProp.value}</Heading>,
    NS.schema('Thing'),
    [
      NS.schema('name'),
      NS.rdfs('label'),
      NS.foaf('name'),
    ],
    NS.argu('widget')
  ),
  LinkedRenderStore.registerRenderer(
    ThingNameHeader,
    NS.schema('Thing'),
    [
      NS.schema('name'),
      NS.rdfs('label'),
      NS.foaf('name'),
    ],
    NS.argu('header')
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <LDLink><Heading data-test="Thing-name-card" size="3">{linkedProp.value}</Heading></LDLink>,
    NS.schema('Thing'),
    [
      NS.schema('name'),
      NS.rdfs('label'),
      NS.foaf('name'),
    ],
    NS.argu('section')
  ),
];
