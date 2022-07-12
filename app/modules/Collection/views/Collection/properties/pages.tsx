import { SomeTerm } from '@ontologies/core';
import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../../topologies';
import ontola from '../../../../Kernel/ontology/ontola';
import { CollectionTypes } from '../types';

interface PagesProps {
  insideCollection: boolean;
  linkedProp: SomeTerm;
  renderWhenEmpty: boolean;
  singlePage: boolean;
}

const Pages: FC<PagesProps> = ({
  insideCollection,
  renderWhenEmpty,
  singlePage,
}) => {
  const pages = useProperty(ontola.pages);

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
    <Resource
      insideCollection={insideCollection}
      key={`pages-${iri.value}`}
      renderWhenEmpty={renderWhenEmpty}
      subject={iri}
    />
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

export default register(Pages);
