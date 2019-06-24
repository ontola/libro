import {
  LinkedResourceContainer,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { CollectionTypes } from '../types';

const Pages = ({
  collectionDisplay,
  columns,
  depth,
  insideCollection,
  pages,
}) => {
  if (pages.length === 1) {
    return (
      <LinkedResourceContainer
        forceRender
        collectionDisplay={collectionDisplay}
        columns={columns}
        depth={depth}
        insideCollection={insideCollection}
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

Pages.property = NS.as('pages');

Pages.topology = allTopologies;

Pages.mapDataToProps = {
  pages: {
    label: NS.as('pages'),
    limit: Infinity,
  },
};

Pages.propTypes = {
  collectionDisplay: linkType,
  columns: linkType,
  depth: PropTypes.number,
  insideCollection: PropTypes.bool,
  pages: linkType,
};

export default [register(Pages)];
