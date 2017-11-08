import { RENDER_CLASS_NAME } from 'link-lib';
import {
  LinkedObjectContainer,
  Property,
  PropertyBase,
  getLinkedObjectPropertyRaw,
  lowLevel,
} from 'link-redux';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';
import { getPage } from '../../state/pagination/selectors';

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
      children = <LinkedObjectContainer object={this.props.currentPage} />;
    } else {
      children = viewsOrMembers(views, this.getLinkedObjectPropertyRaw(NS.argu('members')));
    }
    const createAction = views ? undefined : <Property label={NS.argu('createAction')} />;
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
  getLinkedObjectPropertyRaw(NS.argu('views'), subject, linkedRenderStore),
  getLinkedObjectPropertyRaw(NS.argu('members'), subject, linkedRenderStore),
  NS.argu('section')
);

CollectionSection.contextTypes = {
  linkedRenderStore: PropTypes.object,
};

const LinkedCollectionSection = lowLevel.linkedSubject(lowLevel.linkedVersion(CollectionSection));

LinkedRenderStore.registerRenderer(
  ConnectedCollection,
  [NS.argu('Collection'), NS.hydra('Collection')]
);
LinkedRenderStore.registerRenderer(
  ConnectedCollection,
  [NS.argu('Collection'), NS.hydra('Collection')],
  NS.argu('collection')
);
LinkedRenderStore.registerRenderer(
  LinkedCollectionSection,
  [NS.argu('Collection'), NS.hydra('Collection')],
  RENDER_CLASS_NAME,
  NS.argu('section')
);

export { default as voteMatch } from './voteMatch';
export { default as First } from './properties/first';
export { default as Member } from './properties/member';
export { default as Name } from './properties/name';
export { default as CreateActionProp } from './properties/CreateActionProp';
export { default as Views } from './properties/views';
