import sh from '@ontologies/shacl';
import { RENDER_CLASS_NAME } from 'link-lib';
import {
  linkedPropType,
  register,
  useView,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { allTopologies } from '../../../topologies';
import { omniformFieldsTopology } from '../../../topologies/OmniformFields/OmniformFields';

const TargetClass = ({
  children,
  linkedProp,
  ...props
}) => {
  const View = useView(linkedProp, RENDER_CLASS_NAME, omniformFieldsTopology);

  if (View) {
    return <View {...props} />;
  }

  return children || null;
};

TargetClass.type = sh.NodeShape;

TargetClass.property = sh.targetClass;

TargetClass.topology = allTopologies;

TargetClass.propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

export default register(TargetClass);
