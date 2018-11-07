import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  Property,
  PropertyBase,
  linkType,
} from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { connect } from 'react-redux';

import {
  Resource,
  CardHeader,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { getPage } from '../../state/pagination/selectors';
import { cardTopology } from '../../topologies/Card';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import CardList, { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { cardVoteEventTopology } from '../../topologies/CardVoteEvent';
import Container, { containerTopology } from '../../topologies/Container';
import { gridTopology } from '../../topologies/Grid';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { voteEventTopology } from '../../topologies/VoteEvent';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

import FilteredCollections from './properties/filteredCollections';
import First from './properties/first';
import Member from './properties/member';
import Name from './properties/name';
import UnreadCount from './properties/unreadCount';
import Pages from './properties/pages';
import { CollectionTypes } from './types';
import sidebar from './sidebar';
import voteEvent from './voteEvent';

const mvcPropTypes = {
  totalItems: linkType,
};

function getCollection({
  WrappingElement = Resource,
  fullPage = true,
  renderParent = false,
  renderWhenEmpty = true,
} = {}) {
  class Collection extends PropertyBase {
    pagination() {
      const { defaultType, pages } = this.props;
      if (defaultType && defaultType.value === 'infinite') {
        const lastPage = pages && pages[pages.length - 1];

        if (!lastPage) {
          return null;
        }

        return (
          <LinkedResourceContainer subject={lastPage}>
            <Property label={NS.as('next')} />
          </LinkedResourceContainer>
        );
      }

      return null;
    }

    shouldComponentUpdate(nextProps) {
      return this.props.linkedProp !== nextProps.linkedProp
        || this.props.currentPage !== nextProps.currentPage
        || this.props.linkVersion !== nextProps.linkVersion
        || this.props.subject !== nextProps.subject
        || this.props.pages !== nextProps.pages;
    }

    render() {
      const { totalItems } = this.props;
      if (!renderWhenEmpty && totalItems && totalItems.value === '0') {
        return null;
      }

      let children;
      const pages = this.getLinkedObjectPropertyRaw(NS.as('pages'));
      if (this.props.currentPage) {
        children = <LinkedResourceContainer subject={new NamedNode(this.props.currentPage)} />;
      } else {
        children = <Property forceRender label={NS.as('pages')} />;
      }
      const name = fullPage && pages.length > 0 ? <Property label={NS.as('name')} /> : null;
      const newButton = <Property label={NS.argu('createAction')} />;

      return (
        <WrappingElement>
          <Resource>
            {renderParent && <Property label={NS.schema('isPartOf')} />}
            <CardHeader header={name}>
              {newButton}
            </CardHeader>
            {children}
            {this.pagination()}
          </Resource>
        </WrappingElement>
      );
    }
  }

  const ReduxCollection = connect((state, { subject }) => ({
    currentPage: getPage(state, subject.value),
    renderWhenEmpty,
  }))(Collection);

  return link({
    defaultType: NS.argu('defaultType'),
    pages: {
      label: NS.as('pages'),
      limit: Infinity,
    },
    totalItems: NS.as('totalItems'),
  })(ReduxCollection);
}

const CollectionCardAppendix = ({ totalItems }) => {
  if (totalItems.value === '0') {
    return null;
  }

  return (
    <Resource>
      <Property forceRender label={NS.as('pages')} />
    </Resource>
  );
};

CollectionCardAppendix.propTypes = mvcPropTypes;

const collectionSection = (shortCircuit = true) => {
  const CollectionSection = ({ direction, totalItems }) => {
    const pagesShouldRender = !shortCircuit || totalItems.value !== '0';

    return (
      <CardList direction={direction}>
        {pagesShouldRender && <Property forceRender label={NS.as('pages')} />}
        <Property label={NS.argu('createAction')} />
      </CardList>
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
  LinkedRenderStore.registerRenderer(
    getCollection({
      WrappingElement: Container,
      renderParent: true,
      renderWhenEmpty: true,
    }),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      primaryResourceTopology,
      pageTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link(itemsCount)(collectionSection()),
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
    getCollection({ renderWhenEmpty: false }),
    CollectionTypes,
    RENDER_CLASS_NAME,
    containerTopology
  ),
  ...FilteredCollections,
  First,
  ...Member,
  Name,
  sidebar,
  ...UnreadCount,
  ...Pages,
  ...voteEvent,
];
