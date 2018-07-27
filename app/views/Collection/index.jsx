import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  Property,
  PropertyBase,
  linkedPropType,
  withLinkCtx,
} from 'link-redux';
import { NamedNode } from 'rdflib';
import React from 'react';
import { connect } from 'react-redux';

import { CardRow, Container } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { getPage } from '../../state/pagination/selectors';

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
  totalItems: linkedPropType,
};

function getCollection({ WrappingElement = 'div', renderWhenEmpty = true } = {}) {
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
      const name = pages.length > 0 ? <Property label={NS.as('name')} /> : null;

      return (
        <WrappingElement>
          {name}
          {children}
          {this.pagination()}
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
    <CardRow backdrop>
      <Property forceRender label={NS.as('pages')} topology={NS.argu('cardRow')} />
    </CardRow>
  );
};

CollectionCardAppendix.propTypes = mvcPropTypes;

const collectionSection = (shortCircuit = true) => {
  const CollectionSection = ({ totalItems }) => {
    if (shortCircuit && totalItems.value === '0') {
      return null;
    }

    return (
      <div>
        <Property forceRender label={NS.as('pages')} topology={NS.argu('section')} />
      </div>
    );
  };

  CollectionSection.propTypes = mvcPropTypes;

  return CollectionSection;
};

const CollectionFixedCards = () => (
  <Property forceRender label={NS.as('pages')} topology={NS.argu('grid')} />
);

const wrapUpdate = Component => withLinkCtx(Component);

const itemsCount = {
  totalItems: {
    label: NS.as('totalItems'),
  },
};

export default [
  LinkedRenderStore.registerRenderer(
    getCollection({
      WrappingElement: Container,
      renderWhenEmpty: true,
    }),
    CollectionTypes,
    RENDER_CLASS_NAME
  ),
  LinkedRenderStore.registerRenderer(
    link(itemsCount)(collectionSection()),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      NS.argu('section'),
      NS.argu('card'),
      NS.argu('cardFixed'),
      NS.argu('cardMain'),
      NS.argu('cardRow'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link(itemsCount)(collectionSection({ renderWhenEmpty: false })),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      NS.argu('cardVoteEvent'),
      NS.argu('voteEventCollection'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link(itemsCount)(CollectionCardAppendix),
    CollectionTypes,
    RENDER_CLASS_NAME,
    NS.argu('cardAppendix')
  ),
  LinkedRenderStore.registerRenderer(
    wrapUpdate(CollectionFixedCards),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      NS.argu('grid'),
      NS.argu('widget'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    getCollection({ renderWhenEmpty: false }),
    CollectionTypes,
    RENDER_CLASS_NAME,
    NS.argu('container')
  ),
  LinkedRenderStore.registerRenderer(
    getCollection(),
    CollectionTypes,
    NS.argu('collection')
  ),
  ...FilteredCollections,
  First,
  ...Member,
  Name,
  sidebar,
  UnreadCount,
  ...Pages,
  ...voteEvent,
];
