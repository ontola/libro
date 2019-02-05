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
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardFloatTopology } from '../../../topologies/Card/CardFloat';
import { cardListTopology } from '../../../topologies/Card/CardList';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { cardRowTopology } from '../../../topologies/Card/CardRow';
import { containerTopology } from '../../../topologies/Container';
import { hoverBoxTopology } from '../../../topologies/HoverBox';
import { inlineTopology } from '../../../topologies/Inline';
import { navbarTopology } from '../../../topologies/Navbar';
import { pageHeaderTopology } from '../../../topologies/PageHeader';
import { parentTopology } from '../../../topologies/Parent';
import { popupTopology } from '../../../topologies/Popup';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';
import { selectTopology } from '../../../topologies/Select';
import { tableRowTopology } from '../../../topologies/TableRow';
import TableCell from '../../../topologies/TableCell';
import { widgetTopologyTopology } from '../../../topologies/WidgetTopology/WidgetTopology';

const NamePredicates = [
  NS.schema('name'),
  NS.as('name'),
  NS.rdfs('label'),
  NS.foaf('name'),
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
  name: {
    label: NamePredicates,
  },
  type: {
    label: NS.rdf('type'),
  },
}, { returnType: 'value' })(ColoredHeading);

export default [
  LinkedRenderStore.registerRenderer(
    () => <ConnectedHeading data-test="Thing-name-small-title" size="4" />,
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
    link([NS.schema('name')])(ActionButton),
    NS.schema('Thing'),
    NamePredicates,
    [
      actionsBarTopology,
      cardFloatTopology,
      cardListTopology,
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
    selectTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <LDLink data-test="Thing-name-inline">{linkedProp.value}</LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    inlineTopology
  ),
  LinkedRenderStore.registerRenderer(
    () => <LDLink><ConnectedHeading data-test="Thing-name-card" size="2" /></LDLink>,
    NS.schema('Thing'),
    NamePredicates,
    [
      cardTopology,
      cardFixedTopology,
      cardRowTopology,
      containerTopology,
      popupTopology,
      widgetTopologyTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <span>{linkedProp.value}</span>,
    NS.schema('Thing'),
    NamePredicates,
    parentTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <TableCell><LDLink>{linkedProp.value}</LDLink></TableCell>,
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
