import LinkedRenderStore from 'link-lib';
import { PropertyBase } from 'link-redux';
import React from 'react';

import {
  Heading,
  LDLink,
} from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

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
  NS.rdfs('label'),
  NS.foaf('name'),
];

export default [
  LinkedRenderStore.registerRenderer(
    props => <ColoredHeading data-test="Thing-name-widget" size="4" {...props} />,
    NS.schema('Thing'),
    NamePredicates,
    [undefined, NS.argu('parent'), NS.argu('section')]
  ),
  LinkedRenderStore.registerRenderer(
    props => <ColoredHeading data-test="Thing-name-card-main" size="1" {...props} />,
    NS.schema('Thing'),
    NamePredicates,
    NS.argu('cardMain')
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <span data-test="Thing-name-sidebar">{linkedProp.value}</span>,
    NS.schema('Thing'),
    NamePredicates,
    NS.argu('sidebar')
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <LDLink data-test="Thing-name-inline">{linkedProp.value}</LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    NS.argu('inline')
  ),
  LinkedRenderStore.registerRenderer(
    props => <LDLink><ColoredHeading data-test="Thing-name-card" size="3" {...props} /></LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    [
      NS.argu('card'),
      NS.argu('cardFixed'),
      NS.argu('cardHover'),
      NS.argu('cardRow'),
      NS.argu('collection'),
      NS.argu('container'),
      NS.argu('parent'),
      NS.argu('popup'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    props => <ColoredHeading data-test="Thing-name-card" size="3" {...props} />,
    NS.schema('Thing'),
    NamePredicates,
    NS.argu('parent')
  ),
  LinkedRenderStore.registerRenderer(
    props => <ColoredHeading data-test="Thing-name-widget" size="2" {...props} />,
    NS.schema('Thing'),
    NamePredicates,
    NS.argu('widget')
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <Heading data-test="Thing-name-header">{linkedProp.value}</Heading>,
    NS.schema('Thing'),
    NamePredicates,
    NS.argu('header')
  ),
  LinkedRenderStore.registerRenderer(
    props => <LDLink><ColoredHeading data-test="Thing-name-section" size="4" {...props} /></LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    NS.argu('section')
  ),
];
