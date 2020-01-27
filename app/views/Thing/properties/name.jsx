import as from '@ontologies/as';
import foaf from '@ontologies/foaf';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import LinkedRenderStore from 'link-lib';
import { link, linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  ActionButton,
  Heading,
  LDLink,
} from '../../../components';
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

const NamePredicates = [
  schema.name,
  as.name,
  rdfs.label,
  foaf.name,
  sh.name,
];

class ColoredHeading extends React.PureComponent {
  static propTypes = {
    name: linkType,
    size: PropTypes.string,
    type: linkType,
  };

  getVariant() {
    switch (this.props.type) {
      case 'https://argu.co/ns/core#ConArgument':
        return 'con';
      case 'https://argu.co/ns/core#ProArgument':
        return 'pro';
      case 'https://argu.co/ns/core#Motion':
        return 'motion';
      case 'https://argu.co/ns/core#Question':
        return 'question';
      default:
        return undefined;
    }
  }

  render() {
    const { name, size } = this.props;

    return (
      <Heading
        size={size}
        variant={this.getVariant()}
      >
        {name}
      </Heading>
    );
  }
}

const ConnectedHeading = link({
  name: NamePredicates,
  type: rdfx.type,
}, { returnType: 'value' })(ColoredHeading);

export default [
  LinkedRenderStore.registerRenderer(
    () => <ConnectedHeading data-test="Thing-name-small-title" size="1" />,
    schema.Thing,
    NamePredicates,
    fullResourceTopology
  ),
  LinkedRenderStore.registerRenderer(
    () => (
      <LDLink>
        <ConnectedHeading data-test="Thing-name-card-preview" size="4" />
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
    () => <ConnectedHeading data-test="Thing-name-card-main" size="1" />,
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
    () => <LDLink><ConnectedHeading data-test="Thing-name-card" size="2" /></LDLink>,
    schema.Thing,
    NamePredicates,
    cardTopology
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
      cardRowTopology,
      containerTopology,
      popupTopology,
      gridTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    () => <ConnectedHeading data-test="Thing-name-card-fixed" size="2" />,
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
    ({ linkedProp }) => <LDLink features={['bold']}>{linkedProp?.value}</LDLink>,
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
