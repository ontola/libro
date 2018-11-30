import {
  link,
  linkedPropType,
  LinkedResourceContainer,
  linkType,
  Property,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { connect } from 'react-redux';

import { CardHeader, Resource } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { getPage } from '../../state/pagination/selectors';

export default function getCollection({
  WrappingElement = Resource,
  fullPage = true,
  omniform = false,
  renderParent = false,
  renderWhenEmpty = true,
} = {}) {
  class Collection extends React.Component {
    static propTypes = {
      collectionDisplay: PropTypes.number,
      currentPage: PropTypes.string,
      defaultType: PropTypes.number,
      depth: PropTypes.number,
      linkVersion: linkType,
      linkedProp: linkedPropType,
      pages: linkType,
      renderWhenEmpty: PropTypes.bool,
      subject: subjectType,
      totalItems: linkType,
    };

    shouldComponentUpdate(nextProps) {
      return this.props.linkedProp !== nextProps.linkedProp
        || this.props.currentPage !== nextProps.currentPage
        || this.props.linkVersion !== nextProps.linkVersion
        || this.props.subject !== nextProps.subject
        || this.props.pages !== nextProps.pages;
    }

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

    render() {
      const {
        collectionDisplay,
        depth,
        pages,
        totalItems,
      } = this.props;
      if (!this.props.renderWhenEmpty && totalItems && totalItems.value === '0') {
        return null;
      }

      let children;
      if (this.props.currentPage) {
        children = (
          <LinkedResourceContainer
            collectionDisplay={collectionDisplay}
            depth={depth}
            subject={new NamedNode(this.props.currentPage)}
          />
        );
      } else {
        children = (
          <Property
            forceRender
            collectionDisplay={collectionDisplay}
            depth={depth}
            label={NS.as('pages')}
          />
        );
      }
      const name = fullPage && pages.length > 0 ? <Property label={NS.as('name')} /> : null;
      const newButton = <Property label={NS.argu('createAction')} omniform={omniform} />;
      const header = (!depth || depth === 0) && (
        <CardHeader header={name}>
          {newButton}
        </CardHeader>
      );

      return (
        <WrappingElement wrapperProps={{ className: `Collection__Depth-${depth}` }}>
          {renderParent && <Property label={NS.schema('isPartOf')} />}
          {header}
          {children}
          {this.pagination()}
        </WrappingElement>
      );
    }
  }

  const ReduxCollection = connect((state, { renderWhenEmpty: rwe, subject }) => ({
    currentPage: getPage(state, subject.value),
    renderWhenEmpty: rwe || renderWhenEmpty,
  }))(Collection);

  return link({
    collectionDisplay: NS.argu('collectionDisplay'),
    defaultType: NS.argu('defaultType'),
    pages: {
      label: NS.as('pages'),
      limit: Infinity,
    },
    totalItems: NS.as('totalItems'),
  })(ReduxCollection);
}
