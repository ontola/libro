import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, Property } from 'link-redux';
import PropTypes from 'prop-types';
import { BlankNode, NamedNode } from 'rdflib';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import Button from '../../components/Button';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

const propTypes = {
  autofocusForm: PropTypes.bool,
  onKeyUp: PropTypes.func,
  propertyIndex: PropTypes.number,
  removeItem: PropTypes.func,
  targetNode: PropTypes.oneOfType([
    PropTypes.instanceOf(BlankNode),
    PropTypes.instanceOf(NamedNode),
  ]),
  targetValue: PropTypes.instanceOf(NamedNode),
  theme: PropTypes.string,
  whitelist: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  autofocusForm: true,
};

const NodeShape = ({
  autofocusForm,
  propertyIndex,
  removeItem,
  targetValue,
  targetNode,
  theme,
  onKeyUp,
  whitelist,
}) => (
  <div style={removeItem ? { display: 'flex' } : undefined}>
    <Property label={NS.rdfs('label')} />
    <Property label={NS.sh('targetClass')} />
    <Property
      autofocusForm={autofocusForm}
      label={NS.sh('property')}
      propertyIndex={propertyIndex}
      targetNode={targetNode}
      targetValue={targetValue}
      theme={theme}
      whitelist={whitelist}
      onKeyUp={onKeyUp}
    />
    {removeItem && (
      <Button
        narrow
        plain
        onClick={removeItem}
      >
        <FontAwesome name="times" />
      </Button>
    )}
  </div>
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
