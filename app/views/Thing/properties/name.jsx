import LinkedRenderStore from 'link-lib';
import { PropertyBase } from 'link-redux';
import React from 'react';

import {
  Heading,
  LDLink,
} from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardListTopology } from '../../../topologies/Card/CardList';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { cardRowTopology } from '../../../topologies/Card/CardRow';
import { containerTopology } from '../../../topologies/Container';
import { hoverBoxTopology } from '../../../topologies/HoverBox';
import { inlineTopology } from '../../../topologies/Inline';
import { pageHeaderTopology } from '../../../topologies/PageHeader';
import { parentTopology } from '../../../topologies/Parent';
import { popupTopology } from '../../../topologies/Popup';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';
import { sidebarTopology } from '../../../topologies/Sidebar';
import { widgetTopologyTopology } from '../../../topologies/WidgetTopology/WidgetTopology';

class ColoredHeading extends PropertyBase {
  getVariant() {
    switch (this.getLinkedObjectProperty(NS.rdf('type')).value) {
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
    const { size } = this.props;
    return (
      <Heading
        size={size}
        variant={this.getVariant()}
      >
        {this.getLinkedObjectProperty().value}
      </Heading>
    );
  }
}

const NamePredicates = [
  NS.schema('name'),
  NS.as('name'),
  NS.rdfs('label'),
  NS.foaf('name'),
];

export default [
  LinkedRenderStore.registerRenderer(
    props => <ColoredHeading data-test="Thing-name-small-title" size="4" {...props} />,
    NS.schema('Thing'),
    NamePredicates,
    [primaryResourceTopology, parentTopology]
  ),
  LinkedRenderStore.registerRenderer(
    props => (
      <LDLink>
        <ColoredHeading data-test="Thing-name-card-preview" size="4" {...props} />
      </LDLink>),
    NS.schema('Thing'),
    NamePredicates,
    [hoverBoxTopology, cardListTopology]
  ),
  LinkedRenderStore.registerRenderer(
    props => <ColoredHeading data-test="Thing-name-card-main" size="1" {...props} />,
    NS.schema('Thing'),
    NamePredicates,
    cardMainTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <span data-test="Thing-name-sidebar">{linkedProp.value}</span>,
    NS.schema('Thing'),
    NamePredicates,
    sidebarTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <LDLink data-test="Thing-name-inline">{linkedProp.value}</LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    inlineTopology
  ),
  LinkedRenderStore.registerRenderer(
    props => <LDLink><ColoredHeading data-test="Thing-name-card" size="2" {...props} /></LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    [
      cardTopology,
      cardFixedTopology,
      cardRowTopology,
      containerTopology,
      parentTopology,
      popupTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    props => <ColoredHeading data-test="Thing-name-card" size="3" {...props} />,
    NS.schema('Thing'),
    NamePredicates,
    parentTopology
  ),
  LinkedRenderStore.registerRenderer(
    props => <ColoredHeading data-test="Thing-name-widget" size="2" {...props} />,
    NS.schema('Thing'),
    NamePredicates,
    widgetTopologyTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <Heading data-test="Thing-name-header" size="1">{linkedProp.value}</Heading>,
    NS.schema('Thing'),
    NamePredicates,
    pageHeaderTopology
  ),
];
