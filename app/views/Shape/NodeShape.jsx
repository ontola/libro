import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, Property } from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';

import { allTopologies, NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  autofocusForm: PropTypes.bool,
  onKeyUp: PropTypes.func,
  targetNode: PropTypes.instanceOf(NamedNode),
  theme: PropTypes.string,
  whitelist: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  autofocusForm: true,
};

const NodeShape = ({
  autofocusForm,
  targetNode,
  theme,
  onKeyUp,
  whitelist,
}) => (
  <React.Fragment>
    <Property label={NS.rdfs('label')} />
    <Property
      autofocusForm={autofocusForm}
      label={NS.sh('property')}
      targetNode={targetNode}
      theme={theme}
      whitelist={whitelist}
      onKeyUp={onKeyUp}
    />
  </React.Fragment>
);

NodeShape.propTypes = propTypes;
NodeShape.defaultProps = defaultProps;

export default LinkedRenderStore.registerRenderer(
  link(
    [NS.sh('targetNode')],
    { forceRender: true }
  )(NodeShape),
  NS.sh('NodeShape'),
  RENDER_CLASS_NAME,
  allTopologies
);
