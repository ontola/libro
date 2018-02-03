import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  LinkedResourceContainer,
  Property,
  PropertyBase,
  lowLevel,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import { getPage } from '../../state/pagination/selectors';

// export { default as voteMatch } from './voteMatch';
import First from './properties/first';
import Member from './properties/member';
import Name from './properties/name';
import CreateActionProp from './properties/CreateActionProp';
import Views from './properties/views';

const viewsOrMembers = (views, members, topology) => (
  <Property
    forceRender
    label={views ? NS.argu('views') : NS.argu('members')}
    linkedProp={views || members}
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
      children = <LinkedResourceContainer subject={this.props.currentPage} />;
    } else {
      children = viewsOrMembers(views, this.getLinkedObjectPropertyRaw(NS.argu('members')));
    }
    const createAction = views ? undefined : <Property label={NS.argu('newAction')} />;
    const name = views ? <Property label={NS.schema('name')} /> : null;
    const pagination = !views ? this.pagination() : null;

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
  currentPage: getPage(state, subject.value)
}))(Collection);
const ConnectedCollection = lowLevel.linkedSubject(lowLevel.linkedVersion(ReduxCollection));

const CollectionSection = ({ subject }, { linkedRenderStore }) => viewsOrMembers(
  linkedRenderStore.getResourcePropertyRaw(subject, NS.argu('views')),
  linkedRenderStore.getResourcePropertyRaw(subject, NS.argu('members')),
  NS.argu('section')
);

CollectionSection.contextTypes = {
  linkedRenderStore: PropTypes.object,
};

const LinkedCollectionSection = lowLevel.linkedSubject(lowLevel.linkedVersion(CollectionSection));

export default [
  LinkedRenderStore.registerRenderer(
    LinkedCollectionSection,
    [NS.argu('Collection'), NS.hydra('Collection')],
    RENDER_CLASS_NAME,
    [
      undefined,
      NS.argu('section'),
      NS.argu('voteEventCollection')
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ConnectedCollection,
    [NS.argu('Collection'), NS.hydra('Collection')],
    NS.argu('collection')
  ),
  First,
  ...Member,
  Name,
  CreateActionProp,
  ...Views,
];
