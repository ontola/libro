import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  Property,
  linkType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Resource,
} from '../../components';
import CardContent from '../../components/Card/CardContent';
import { NS } from '../../helpers/LinkedRenderStore';
import { alertDialogTopology } from '../../topologies/Dialog';
import { cardTopology } from '../../topologies/Card';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import CardList, { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { cardVoteEventTopology } from '../../topologies/CardVoteEvent';
import Container from '../../topologies/Container';
import { gridTopology } from '../../topologies/Grid';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { tabPaneTopology } from '../../topologies/TabPane';
import { voteEventTopology } from '../../topologies/VoteEvent';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

import getCollection from './getCollection';
import CreateAction from './properties/createAction';
import FilteredCollections from './properties/filteredCollections';
import First from './properties/first';
import Name from './properties/name';
import UnreadCount from './properties/unreadCount';
import Pages from './properties/pages';
import { CollectionTypes } from './types';
import voteEvent from './voteEvent';
import CollectionContainer from './CollectionContainer';
import CollectionNavbar from './CollectionNavbar';
import CollectionTableCell from './CollectionTableCell';

import './Collection.scss';

const mvcPropTypes = {
  totalItems: linkType,
};

const CollectionCardAppendix = ({ totalItems }) => {
  if (totalItems.value === '0') {
    return null;
  }

  return (
    <Resource>
      <Property forceRender insideCollection label={NS.as('pages')} />
    </Resource>
  );
};

CollectionCardAppendix.propTypes = mvcPropTypes;

const collectionSection = ({ omniform = false, renderWhenEmpty = false } = {}) => {
  const CollectionSection = ({ direction, totalItems }) => {
    const pagesShouldRender = renderWhenEmpty || totalItems.value !== '0';

    return (
      <CardContent noStartSpacing>
        <CardList direction={direction}>
          {pagesShouldRender && <Property forceRender insideCollection label={NS.as('pages')} />}
          <Property label={NS.ontola('createAction')} omniform={omniform} />
        </CardList>
      </CardContent>
    );
  };

  CollectionSection.propTypes = {
    direction: PropTypes.oneOf(['column']),
    totalItems: linkType,
  };

  return CollectionSection;
};

const itemsCount = {
  totalItems: {
    label: NS.as('totalItems'),
  },
};

export default [
  CollectionContainer,
  CollectionNavbar,
  CollectionTableCell,
  LinkedRenderStore.registerRenderer(
    getCollection({
      WrappingElement: Container,
      renderParent: true,
      renderWhenEmpty: true,
    }),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      alertDialogTopology,
      primaryResourceTopology,
      pageTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link(itemsCount)(collectionSection({ omniform: true })),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      cardTopology,
      cardFixedTopology,
      cardListTopology,
      cardMainTopology,
      cardRowTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link(itemsCount)(collectionSection({ renderWhenEmpty: false })),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      cardVoteEventTopology,
      voteEventTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link(itemsCount)(CollectionCardAppendix),
    CollectionTypes,
    RENDER_CLASS_NAME,
    cardAppendixTopology
  ),
  LinkedRenderStore.registerRenderer(
    getCollection({
      fullPage: false,
      renderWhenEmpty: true,
    }),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      gridTopology,
      widgetTopologyTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    getCollection({
      WrappingElement: Container,
      renderWhenEmpty: true,
    }),
    CollectionTypes,
    RENDER_CLASS_NAME,
    tabPaneTopology
  ),
  CreateAction,
  ...FilteredCollections,
  First,
  Name,
  ...UnreadCount,
  ...Pages,
  ...voteEvent,
];
