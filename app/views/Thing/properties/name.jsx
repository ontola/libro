import rdfx from '@ontologies/rdf';
import LinkedRenderStore from 'link-lib';
import { link, linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  ActionButton,
  Heading,
  LDLink,
} from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
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
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';
import { radioGroupTopology } from '../../../topologies/RadioGroup';
import { selectTopology } from '../../../topologies/Select';
import { tableRowTopology } from '../../../topologies/TableRow';
import { widgetTopologyTopology } from '../../../topologies/WidgetTopology/WidgetTopology';

const NamePredicates = [
  NS.schema('name'),
  NS.as('name'),
  NS.rdfs('label'),
  NS.foaf('name'),
  NS.sh('name'),
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
    NS.schema('Thing'),
    NamePredicates,
    primaryResourceTopology
  ),
  LinkedRenderStore.registerRenderer(
    () => (
      <LDLink>
        <ConnectedHeading data-test="Thing-name-card-preview" size="4" />
      </LDLink>
    ),
    NS.schema('Thing'),
    NamePredicates,
    hoverBoxTopology
  ),
  LinkedRenderStore.registerRenderer(
    link({ name: NS.schema('name') })(ActionButton),
    NS.schema('Thing'),
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
    NS.schema('Thing'),
    NamePredicates,
    cardMainTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <span data-test="Thing-name-header">{linkedProp.value}</span>,
    NS.schema('Thing'),
    NamePredicates,
    navbarTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <span data-test="Thing-name-select">{linkedProp.value}</span>,
    NS.schema('Thing'),
    NamePredicates,
    [radioGroupTopology, selectTopology]
  ),
  LinkedRenderStore.registerRenderer(
    () => <LDLink><ConnectedHeading data-test="Thing-name-card" size="2" /></LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    cardTopology
  ),
  LinkedRenderStore.registerRenderer(
    () => <LDLink><ConnectedHeading data-test="Thing-name-card-link" size="2" /></LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    [
      cardRowTopology,
      containerTopology,
      popupTopology,
      widgetTopologyTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    () => <ConnectedHeading data-test="Thing-name-card-fixed" size="2" />,
    NS.schema('Thing'),
    NamePredicates,
    cardFixedTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <span data-test="Thing-name-inline">{linkedProp.value}</span>,
    NS.schema('Thing'),
    NamePredicates,
    [
      attributeListTopology,
      inlineTopology,
      parentTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <LDLink features={['bold']}>{linkedProp?.value}</LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    tableRowTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <Heading data-test="Thing-name-header" size="1">{linkedProp.value}</Heading>,
    NS.schema('Thing'),
    NamePredicates,
    pageHeaderTopology
  ),
];
