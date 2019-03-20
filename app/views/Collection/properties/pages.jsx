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
  depth,
  pages,
}) => {
  if (pages.length === 1) {
    return (
      <LinkedResourceContainer
        forceRender
        collectionDisplay={collectionDisplay}
        depth={depth}
        subject={pages[0]}
      />
    );
  }

  const obs = pages.map(iri => (
    <LinkedResourceContainer
      collectionDisplay={collectionDisplay}
      depth={depth}
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
  depth: PropTypes.number,
  pages: linkType,
};

export default [register(Pages)];
