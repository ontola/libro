import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  LinkedResourceContainer,
  Property,
  PropertyBase,
  subjectType,
  lowLevel,
} from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { connect } from 'react-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import { getPage } from '../../state/pagination/selectors';

import First from './properties/first';
import Member from './properties/member';
import Name from './properties/name';
import Views from './properties/views';
import { CollectionTypes } from './types';

const contextTypes = {
  linkedRenderStore: PropTypes.object,
};

const propTypes = {
  subject: subjectType,
};

const viewsOrMembers = (views, members, topology) => (
  <Property
    forceRender
    label={views.length > 0 ? NS.argu('views') : NS.argu('members')}
    topology={topology}
  />
);

class Collection extends PropertyBase {
  pagination() {
    const collectionIRI = this.getLinkedObjectProperty(NS.argu('parentView'));
    return <Property collectionIRI={collectionIRI} label={NS.argu('first')} />;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.linkedProp !== nextProps.linkedProp ||
      this.props.currentPage !== nextProps.currentPage ||
      this.props.version !== nextProps.version ||
      this.props.subject !== nextProps.subject;
  }

  render() {
    let children;
    const views = this.getLinkedObjectPropertyRaw(NS.argu('views'));
    if (this.props.currentPage) {
      children = <LinkedResourceContainer subject={new NamedNode(this.props.currentPage)} />;
    } else {
      children = viewsOrMembers(views, this.getLinkedObjectPropertyRaw(NS.argu('members')));
    }
    const createAction = views.length > 0 ? undefined : <Property label={NS.argu('newAction')} />;
    const name = views.length > 0 ? <Property label={NS.schema('name')} /> : null;
    const pagination = views.length === 0 ? this.pagination() : null;

    return (
      <div>
        {name}
        {children}
        {pagination}
        {createAction}
      </div>
    );
  }
}

const ReduxCollection = connect((state, { subject }) => ({
  currentPage: getPage(state, subject)
}))(Collection);
const ConnectedCollection = lowLevel.linkedSubject(lowLevel.linkedVersion(ReduxCollection));

const CollectionSection = ({ subject }, { linkedRenderStore }) => {
  if (linkedRenderStore.getResourceProperty(subject, NS.argu('totalCount')).value === '0') {
    return null;
  }
  return viewsOrMembers(
    linkedRenderStore.getResourcePropertyRaw(subject, NS.argu('views')),
    linkedRenderStore.getResourcePropertyRaw(subject, NS.argu('members')),
    NS.argu('section')
  );
};

CollectionSection.contextTypes = contextTypes;

const CollectionContainer = ({ subject }, { linkedRenderStore }) => viewsOrMembers(
  linkedRenderStore.getResourcePropertyRaw(subject, NS.argu('views')),
  linkedRenderStore.getResourcePropertyRaw(subject, NS.argu('members')),
  NS.argu('container')
);

CollectionContainer.contextTypes = contextTypes;

const CollectionFixedCards = ({ subject }, { linkedRenderStore }) => (
  viewsOrMembers(
    linkedRenderStore.getResourcePropertyRaw(subject, NS.argu('views')),
    linkedRenderStore.getResourcePropertyRaw(subject, NS.argu('members')),
    NS.argu('grid')
  )
);

CollectionFixedCards.contextTypes = contextTypes;
CollectionFixedCards.propTypes = propTypes;

const wrapUpdate = Component => lowLevel.linkedSubject(lowLevel.linkedVersion(Component));

export default [
  LinkedRenderStore.registerRenderer(
    wrapUpdate(CollectionSection),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      NS.argu('section'),
      NS.argu('voteEventCollection'),
      NS.argu('card'),
      NS.argu('cardFixed'),
      NS.argu('cardMain'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    wrapUpdate(CollectionFixedCards),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      NS.argu('grid'),
      NS.argu('widget')
    ]
  ),
  LinkedRenderStore.registerRenderer(
    wrapUpdate(ConnectedCollection),
    CollectionTypes,
    RENDER_CLASS_NAME,
    [
      undefined,
      NS.argu('container')
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ConnectedCollection,
    CollectionTypes,
    NS.argu('collection')
  ),
  First,
  ...Member,
  Name,
  ...Views,
];
