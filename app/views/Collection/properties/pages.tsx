import { NamedNode, SomeTerm } from '@ontologies/core';
import {
  FC,
  Resource,
  ReturnType,
  register,
} from 'link-redux';
import React from 'react';

import Suspense from '../../../components/Suspense';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { CollectionTypes } from '../types';
import { LoadingGridContent } from '../../../components/Loading';

interface PagesProps {
  collectionDisplay: SomeTerm;
  columns: NamedNode[];
  depth: number;
  insideCollection: boolean;
  linkedProp: SomeTerm;
  maxColumns: number;
  pages: SomeTerm[];
  renderWhenEmpty: boolean;
  singlePage: boolean;
  view: SomeTerm;
}

const Pages: FC<PagesProps> = ({
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
    <Suspense fallback={<LoadingGridContent />} key={`${iri.value}-loader`}>
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

export default [register(Pages)];
