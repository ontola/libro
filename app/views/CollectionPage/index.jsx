import {
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router';

import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { currentLocation } from '../../helpers/paths';
import { allTopologiesExcept } from '../../topologies';
import { inlineTopology } from '../../topologies/Inline';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';

import CollectionPageInline from './CollectionPageInline';
import Items from './properties/items';
import Name from './properties/name';
import Views from './properties/views';
import voteEvent from './voteEvent';
import { CollectionViewTypes } from './types';

function getCollectionPage({
  hidePagination = true,
  redirect = false,
  topology = [],
} = {}) {
  const CollectionPage = (props) => {
    if (props.insideCollection) {
      if (__CLIENT__ && props.redirectPagination) {
        if (currentLocation(props.location) !== props.subject) {
          return <Redirect to={retrievePath(props.subject.value)} />;
        }
      }

      return (
        <Property
          forceRender
          collectionDisplay={props.collectionDisplay}
          columns={props.columns}
          depth={props.depth}
          label={NS.as('items')}
          renderLimit={Infinity}
        />
      );
    }

    return (
      <Property
        currentPage={props.subject.value}
        hidePagination={hidePagination}
        label={NS.as('partOf')}
        redirectPagination={redirect}
      />
    );
  };

  CollectionPage.type = CollectionViewTypes;

  CollectionPage.topology = topology;

  CollectionPage.hocs = [withRouter];

  CollectionPage.mapDataToProps = [NS.ontola('collectionDisplay')];

  CollectionPage.propTypes = {
    collectionDisplay: linkType,
    columns: linkType,
    depth: PropTypes.number,
    insideCollection: PropTypes.bool,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    redirectPagination: PropTypes.bool,
    subject: subjectType,
  };

  return CollectionPage;
}

const DefaultCollectionPage = getCollectionPage({
  topology: allTopologiesExcept(pageTopology, primaryResourceTopology, inlineTopology),
});

const PageCollectionPage = getCollectionPage({
  hidePagination: false,
  redirect: true,
  topology: [pageTopology, primaryResourceTopology],
});

export default [
  register(DefaultCollectionPage),
  register(PageCollectionPage),
  CollectionPageInline,
  ...Items,
  Name,
  ...Views,
  ...voteEvent,
];
