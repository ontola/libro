import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, Property } from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';

import { allTopologies, NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  onKeyUp: PropTypes.func,
  targetNode: PropTypes.instanceOf(NamedNode),
  theme: PropTypes.string,
  whitelist: PropTypes.arrayOf(PropTypes.object),
};

const NodeShape = ({
  targetNode,
  theme,
  onKeyUp,
  whitelist,
}) => (
  <React.Fragment>
    <Property label={NS.rdfs('label')} />
    <Property
      label={NS.sh('property')}
      targetNode={targetNode}
      theme={theme}
      whitelist={whitelist}
      onKeyUp={onKeyUp}
    />
  </React.Fragment>
);

NodeShape.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link(
    [NS.sh('targetNode')],
    { forceRender: true }
  )(NodeShape),
  NS.sh('NodeShape'),
  RENDER_CLASS_NAME,
  allTopologies
);
