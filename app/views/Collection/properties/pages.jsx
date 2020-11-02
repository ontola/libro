import {
  Resource,
  ReturnType,
  linkType,
  linkedPropType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Suspense from '../../../components/Suspense';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { CollectionTypes } from '../types';
import { LoadingGridContent } from '../../../components/Loading';

const Pages = ({
  children,
  collectionDisplay,
  columns,
  depth,
  insideCollection,
  linkedProp,
  maxColumns,
  pages,
  renderWhenEmpty,
  singlePage,
  view,
}) => {
  if (children) {
    return (
      <Resource subject={linkedProp}>
        {children}
      </Resource>
    );
  }

  if (singlePage || pages.length === 1) {
    return (
      <Resource
        forceRender
        collectionDisplay={collectionDisplay}
        columns={columns}
        depth={depth}
        insideCollection={insideCollection}
        maxColumns={maxColumns}
        renderWhenEmpty={renderWhenEmpty}
        subject={pages[0]}
        view={view}
      />
    );
  }

  const obs = pages.map((iri) => (
    <Suspense fallback={<LoadingGridContent />}>
      <Resource
        collectionDisplay={collectionDisplay}
        columns={columns}
        depth={depth}
        insideCollection={insideCollection}
        key={`pages-${iri.value}`}
        renderWhenEmpty={renderWhenEmpty}
        subject={iri}
        view={view}
      />
    </Suspense>
  ));

  if (obs) {
    return (
      <React.Fragment>
        {obs}
      </React.Fragment>
    );
  }

  return null;
};

Pages.type = CollectionTypes;

Pages.property = ontola.pages;

Pages.topology = allTopologies;

Pages.mapDataToProps = {
  pages: {
    label: ontola.pages,
    returnType: ReturnType.AllTerms,
  },
};

Pages.propTypes = {
  children: PropTypes.node,
  collectionDisplay: linkType,
  columns: linkType,
  depth: PropTypes.number,
  insideCollection: PropTypes.bool,
  linkedProp: linkedPropType,
  maxColumns: PropTypes.number,
  pages: linkType,
  renderWhenEmpty: PropTypes.bool,
  singlePage: PropTypes.bool,
  view: linkType,
};

export default [register(Pages)];
