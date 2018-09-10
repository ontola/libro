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

import { CardRow } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { getPage } from '../../state/pagination/selectors';

import First from './properties/first';
import Member from './properties/member';
import Name from './properties/name';
import Views from './properties/views';
import { CollectionViewTypes } from './types';
import voteEvent from './voteEvent';

const mvcPropTypes = {
  totalCount: linkedPropType,
};

class CollectionPage extends PropertyBase {
  pagination() {
    const collectionIRI = this.getLinkedObjectProperty(NS.as('partOf'));
    return <Property collectionIRI={collectionIRI} label={NS.as('first')} />;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.linkedProp !== nextProps.linkedProp
      || this.props.currentPage !== nextProps.currentPage
      || this.props.linkVersion !== nextProps.linkVersion
      || this.props.subject !== nextProps.subject;
  }

  render() {
    let children;
    const views = this.getLinkedObjectPropertyRaw(NS.as('pages'));
    if (this.props.currentPage) {
      children = <LinkedResourceContainer subject={new NamedNode(this.props.currentPage)} />;
    } else {
      children = <Property forceRender label={NS.as('items')} renderLimit={Infinity} />;
    }
    const pagination = views.length === 0 ? this.pagination() : null;

    return (
      <div>
        {children}
        {pagination}
      </div>
    );
  }
}

const ReduxCollectionPage = connect((state, { subject }) => ({
  currentPage: getPage(state, subject),
}))(CollectionPage);
const ConnectedCollectionView = withLinkCtx(ReduxCollectionPage);

const CollectionViewCardAppendix = ({ totalCount }) => {
  if (totalCount.value === '0') {
    return null;
  }

  return (
    <CardRow backdrop>
      <Property forceRender label={NS.as('items')} renderLimit={Infinity} topology={NS.argu('cardRow')} />
    </CardRow>
  );
};

CollectionViewCardAppendix.propTypes = mvcPropTypes;

const collectionViewSection = (shortCircuit = true) => {
  const CollectionViewSection = ({ totalCount }) => {
    if (shortCircuit && totalCount.value === '0') {
      return null;
    }

    return (
      <Property forceRender label={NS.as('items')} renderLimit={Infinity} topology={NS.argu('cardList')} />
    );
  };

  CollectionViewSection.propTypes = mvcPropTypes;

  return CollectionViewSection;
};

const CollectionViewFixedCards = () => (
  <Property forceRender label={NS.as('items')} renderLimit={Infinity} topology={NS.argu('grid')} />
);

const wrapUpdate = Component => withLinkCtx(Component);

const membersViewsCount = {
  totalCount: {
    label: NS.as('totalItems'),
  },
};

export default [
  LinkedRenderStore.registerRenderer(
    link(membersViewsCount)(collectionViewSection()),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    [
      NS.argu('cardList'),
      NS.argu('card'),
      NS.argu('cardFixed'),
      NS.argu('cardMain'),
      NS.argu('cardRow'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link(membersViewsCount)(collectionViewSection(false)),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    [
      NS.argu('cardVoteEvent'),
      NS.argu('voteEventCollection'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link(membersViewsCount)(CollectionViewCardAppendix),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    NS.argu('cardAppendix')
  ),
  LinkedRenderStore.registerRenderer(
    wrapUpdate(CollectionViewFixedCards),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    [
      NS.argu('grid'),
      NS.argu('widget'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    wrapUpdate(ConnectedCollectionView),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    [
      undefined,
      NS.argu('container'),
    ]
  ),
  First,
  ...Member,
  Name,
  ...Views,
  ...voteEvent,
];
