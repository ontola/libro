import { RENDER_CLASS_NAME } from 'link-lib';
import {
  linkedPropType,
  register,
  useView,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { omniformFieldsTopology } from '../../../topologies/OmniformFields/OmniformFields';

const TargetClass = ({ children, linkedProp, ...props }) => {
  const View = linkedProp && useView(linkedProp, RENDER_CLASS_NAME, omniformFieldsTopology);

  if (View) {
    return <View {...props} />;
  }

  return children;
};

TargetClass.type = NS.sh('NodeShape');

TargetClass.property = NS.sh('targetClass');

TargetClass.topology = allTopologies;

TargetClass.propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

export default register(TargetClass);
