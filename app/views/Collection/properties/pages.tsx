import { SomeTerm } from '@ontologies/core';
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
  insideCollection: boolean;
  linkedProp: SomeTerm;
  pages: SomeTerm[];
  renderWhenEmpty: boolean;
  singlePage: boolean;
}

const Pages: FC<PagesProps> = ({
  children,
  insideCollection,
  linkedProp,
  pages,
  renderWhenEmpty,
  singlePage,
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
        insideCollection={insideCollection}
        renderWhenEmpty={renderWhenEmpty}
        subject={pages[0]}
      />
    );
  }

  const obs = pages.map((iri) => (
    <Suspense fallback={<LoadingGridContent />} key={`${iri.value}-loader`}>
      <Resource
        insideCollection={insideCollection}
        key={`pages-${iri.value}`}
        renderWhenEmpty={renderWhenEmpty}
        subject={iri}
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
