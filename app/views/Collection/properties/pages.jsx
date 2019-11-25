import {
  LinkedResourceContainer,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { CollectionTypes } from '../types';

const Pages = ({
  collectionDisplay,
  columns,
  depth,
  insideCollection,
  pages,
  renderWhenEmpty,
  singlePage,
}) => {
  if (singlePage || pages.length === 1) {
    return (
      <LinkedResourceContainer
        forceRender
        collectionDisplay={collectionDisplay}
        columns={columns}
        depth={depth}
        insideCollection={insideCollection}
        renderWhenEmpty={renderWhenEmpty}
        subject={pages[0]}
      />
    );
  }

  const obs = pages.map(iri => (
    <LinkedResourceContainer
      collectionDisplay={collectionDisplay}
      columns={columns}
      depth={depth}
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

Pages.mapDataToProps = {
  pages: {
    label: ontola.pages,
    limit: Infinity,
  },
};

Pages.propTypes = {
  collectionDisplay: linkType,
  columns: linkType,
  depth: PropTypes.number,
  insideCollection: PropTypes.bool,
  pages: linkType,
  renderWhenEmpty: PropTypes.bool,
  singlePage: PropTypes.bool,
};

export default [register(Pages)];
