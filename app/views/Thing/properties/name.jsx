import LinkedRenderStore from 'link-lib';
import { PropertyBase } from 'link-redux';
import React from 'react';
import { Literal } from 'rdflib';

import {
  Heading,
  LDLink,
} from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

class ColoredHeading extends PropertyBase {
  getVariant() {
    switch (this.getLinkedObjectProperty(NS.rdf('type')).value) {
      case 'https://argu.co/ns/core#Argument':
        return this.getLinkedObjectProperty(NS.schema('option')).equals(Literal.fromBoolean(true)) ? 'pro' : 'con';
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
    props => <LDLink><ColoredHeading data-test="Thing-name-widget" size="4" {...props} /></LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    [undefined, NS.argu('collection'), NS.argu('parent'), NS.argu('section')]
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
    props => <ColoredHeading data-test="Thing-name-collection" size="3" {...props} />,
    NS.schema('Thing'),
    NamePredicates,
    [
      NS.argu('card'),
      NS.argu('collection'),
    ]
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
    props => <LDLink><ColoredHeading size="4" {...props} /></LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    NS.argu('section')
  ),
  LinkedRenderStore.registerRenderer(
    props => <LDLink><ColoredHeading data-test="Thing-name-card" size="3" {...props} /></LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    NS.argu('card')
  ),
];
