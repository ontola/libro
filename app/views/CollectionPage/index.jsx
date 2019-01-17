import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  Property,
  linkType,
  withLinkCtx,
} from 'link-redux';
import { NamedNode } from 'rdflib';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
import Items from './properties/items';
import Name from './properties/name';
import Views from './properties/views';
import { CollectionViewTypes } from './types';
import voteEvent from './voteEvent';

const mvcPropTypes = {
  collectionDisplay: linkType,
  totalCount: linkType,
};

const CollectionPage = (props) => {
  let children;
  if (props.currentPage) {
    children = (
      <LinkedResourceContainer
        depth={props.depth}
        subject={new NamedNode(props.currentPage)}
      />
    );
  } else {
    children = (
      <Property
        forceRender
        collectionDisplay={props.collectionDisplay}
        depth={props.depth}
        label={NS.as('items')}
        renderLimit={Infinity}
      />
    );
  }

  let pagination = null;
  if (props.views && props.views.length === 0) {
    pagination = <Property collectionIRI={props.collectionIRI} label={NS.as('first')} />;
  }

  return (
    <React.Fragment>
      {children}
      {pagination}
    </React.Fragment>
  );
};

CollectionPage.mapDataToProps = {
  collectionIRI: NS.as('partOf'),
  views: {
    label: NS.as('pages'),
    limit: Infinity,
    returnType: 'statement',
  },
};
CollectionPage.propTypes = {
  collectionDisplay: linkType,
  collectionIRI: linkType,
  currentPage: PropTypes.string,
  depth: PropTypes.number,
  views: PropTypes.arrayOf(linkType),
};

const ReduxCollectionPage = connect((state, { subject }) => ({
  currentPage: getPage(state, subject),
}))(CollectionPage);
const ConnectedCollectionView = withLinkCtx(ReduxCollectionPage);

const CollectionViewCardAppendix = ({ collectionDisplay, totalCount }) => {
  if (totalCount.value === '0') {
    return null;
  }

  return (
    <CardRow backdrop>
      <Property
        forceRender
        collectionDisplay={collectionDisplay}
        label={NS.as('items')}
        renderLimit={Infinity}
        topology={cardRowTopology}
      />
    </CardRow>
  );
};

CollectionViewCardAppendix.propTypes = mvcPropTypes;

const collectionViewSection = (shortCircuit = true) => {
  const CollectionViewSection = ({ collectionDisplay, totalCount }) => {
    if (shortCircuit && totalCount.value === '0') {
      return null;
    }

    return (
      <Property
        forceRender
        collectionDisplay={collectionDisplay}
        label={NS.as('items')}
        renderLimit={Infinity}
        topology={cardListTopology}
      />
    );
  };

  CollectionViewSection.propTypes = mvcPropTypes;

  return CollectionViewSection;
};

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
    ConnectedCollectionView,
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    [
      gridTopology,
      widgetTopologyTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ConnectedCollectionView,
    CollectionViewTypes,
    RENDER_CLASS_NAME,
    [
      undefined,
      pageTopology,
      containerTopology,
    ]
  ),
  First,
  ...Items,
  Name,
  ...Views,
  ...voteEvent,
];
