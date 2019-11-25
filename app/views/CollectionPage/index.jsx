import as from '@ontologies/as';
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
import { currentLocation } from '../../helpers/paths';
import ontola from '../../ontology/ontola';
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
          collectionDisplay={props.collectionDisplay || props.collectionDisplayFromData}
          columns={props.columns}
          depth={props.depth}
          label={as.items}
          renderLimit={Infinity}
        />
      );
    }

    return (
      <Property
        collectionDisplay={props.collectionDisplay || props.collectionDisplayFromData}
        currentPage={props.subject.value}
        hidePagination={hidePagination}
        label={as.partOf}
        redirectPagination={redirect}
        renderWhenEmpty={props.renderWhenEmpty}
      />
    );
  };

  CollectionPage.type = CollectionViewTypes;

  CollectionPage.topology = topology;

  CollectionPage.hocs = [withRouter];

  CollectionPage.mapDataToProps = {
    collectionDisplayFromData: ontola.collectionDisplay,
  };

  CollectionPage.propTypes = {
    collectionDisplay: linkType,
    collectionDisplayFromData: linkType,
    columns: linkType,
    depth: PropTypes.number,
    insideCollection: PropTypes.bool,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    redirectPagination: PropTypes.bool,
    renderWhenEmpty: PropTypes.bool,
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
