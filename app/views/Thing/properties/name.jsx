import as from '@ontologies/as';
import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import LinkedRenderStore from 'link-lib';
import {
  ReturnType,
  link,
  linkType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ActionButton from '../../../components/ActionButton';
import Heading from '../../../components/Heading';
import LDLink from '../../../components/LDLink';
import { actionsBarTopology } from '../../../topologies/ActionsBar';
import { attributeListTopology } from '../../../topologies/AttributeList';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardFloatTopology } from '../../../topologies/Card/CardFloat';
import { cardListTopology } from '../../../topologies/Card/CardList';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { cardRowTopology } from '../../../topologies/Card/CardRow';
import { containerTopology } from '../../../topologies/Container';
import { containerFloatTopology } from '../../../topologies/Container/ContainerFloat';
import { hoverBoxTopology } from '../../../topologies/HoverBox';
import { inlineTopology } from '../../../topologies/Inline';
import { navbarTopology } from '../../../topologies/Navbar';
import { pageHeaderTopology } from '../../../topologies/PageHeader';
import { parentTopology } from '../../../topologies/Parent';
import { popupTopology } from '../../../topologies/Popup';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { radioGroupTopology } from '../../../topologies/RadioGroup';
import { selectTopology } from '../../../topologies/Select';
import { tableRowTopology } from '../../../topologies/TableRow';
import { gridTopology } from '../../../topologies/Grid';
import { footerTopology } from '../../../topologies/Footer';

const NamePredicates = [
  schema.name,
  as.name,
  rdfs.label,
  foaf.name,
  sh.name,
];

const ColoredHeading = ({
  name,
  size,
  variant,
  type,
}) => (
  <Heading
    size={size}
    type={type}
    variant={variant}
  >
    {name}
  </Heading>
);

ColoredHeading.propTypes = {
  name: linkType,
  size: PropTypes.string,
  type: linkType,
  variant: PropTypes.string,
};

const ConnectedHeading = link({
  name: NamePredicates,
  type: rdfx.type,
}, { returnType: ReturnType.Value })(ColoredHeading);

export default [
  LinkedRenderStore.registerRenderer(
    () => <ConnectedHeading data-test="Thing-name-small-title" size="1" />,
    schema.Thing,
    NamePredicates,
    fullResourceTopology
  ),
  LinkedRenderStore.registerRenderer(
    () => (
      <LDLink target="modal">
        <ConnectedHeading data-test="Thing-name-card-preview" size="4" variant="semantic" />
      </LDLink>
    ),
    schema.Thing,
    NamePredicates,
    hoverBoxTopology
  ),
  LinkedRenderStore.registerRenderer(
    link({ name: schema.name })(ActionButton),
    schema.Thing,
    NamePredicates,
    [
      actionsBarTopology,
      cardFloatTopology,
      cardListTopology,
      containerFloatTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <Heading size="3" variant="navbar">{linkedProp.value}</Heading>,
    schema.Thing,
    NamePredicates,
    footerTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ size }) => <ConnectedHeading data-test="Thing-name-card-main" size={size || '1'} variant="semantic" />,
    schema.Thing,
    NamePredicates,
    cardMainTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <span data-test="Thing-name-header">{linkedProp.value}</span>,
    schema.Thing,
    NamePredicates,
    navbarTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <span data-test="Thing-name-select">{linkedProp.value}</span>,
    schema.Thing,
    NamePredicates,
    [radioGroupTopology, selectTopology]
  ),
  LinkedRenderStore.registerRenderer(
    () => <LDLink><ConnectedHeading data-test="Thing-name-card" size="2" variant="semantic" /></LDLink>,
    schema.Thing,
    NamePredicates,
    [
      cardTopology,
      cardRowTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ({ wrapper }) => {
      const Wrapper = wrapper || LDLink;

      return (
        <Wrapper><ConnectedHeading data-test="Thing-name-card-link" size="2" /></Wrapper>
      );
    },
    schema.Thing,
    NamePredicates,
    [
      containerTopology,
      popupTopology,
      gridTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    () => <ConnectedHeading data-test="Thing-name-card-fixed" size="2" variant="semantic" />,
    schema.Thing,
    NamePredicates,
    cardFixedTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <span data-test="Thing-name-inline">{linkedProp.value}</span>,
    schema.Thing,
    NamePredicates,
    [
      attributeListTopology,
      inlineTopology,
      parentTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    () => <LDLink><ConnectedHeading size="4" variant="semantic" /></LDLink>,
    schema.Thing,
    NamePredicates,
    tableRowTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <Heading data-test="Thing-name-header" size="1">{linkedProp.value}</Heading>,
    schema.Thing,
    NamePredicates,
    pageHeaderTopology
  ),
];
