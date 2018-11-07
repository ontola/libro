import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  Property,
  PropertyBase,
  linkType,
  withLinkCtx,
} from 'link-redux';
import { NamedNode } from 'rdflib';
import React from 'react';
import { connect } from 'react-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import { getPage } from '../../state/pagination/selectors';
import { cardTopology } from '../../topologies/Card';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import CardRow, { cardRowTopology } from '../../topologies/Card/CardRow';
import { cardVoteEventTopology } from '../../topologies/CardVoteEvent';
import { containerTopology } from '../../topologies/Container';
import { gridTopology } from '../../topologies/Grid';
import { pageTopology } from '../../topologies/Page';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

import First from './properties/first';
import Member from './properties/member';
import Name from './properties/name';
import Views from './properties/views';
import { CollectionViewTypes } from './types';
import voteEvent from './voteEvent';

const mvcPropTypes = {
  totalCount: linkType,
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
      <Property forceRender label={NS.as('items')} renderLimit={Infinity} topology={cardRowTopology} />
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
      <Property forceRender label={NS.as('items')} renderLimit={Infinity} topology={cardListTopology} />
    );
  };

  CollectionViewSection.propTypes = mvcPropTypes;

  return CollectionViewSection;
};

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
      cardListTopology,
      cardTopology,
      cardFixedTopology,
      cardMainTopology,
      cardRowTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link(membersViewsCount)(collectionViewSection(false)),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    [
      cardVoteEventTopology,
      NS.argu('voteEventCollection'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link(membersViewsCount)(CollectionViewCardAppendix),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    cardAppendixTopology
  ),
  LinkedRenderStore.registerRenderer(
    wrapUpdate(ConnectedCollectionView),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    [
      gridTopology,
      widgetTopologyTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    wrapUpdate(ConnectedCollectionView),
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    [
      undefined,
      pageTopology,
      containerTopology,
    ]
  ),
  First,
  ...Member,
  Name,
  ...Views,
  ...voteEvent,
];
