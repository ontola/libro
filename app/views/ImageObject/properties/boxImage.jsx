import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Image } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const boxImage = ({ linkedProp, style }) => (
  <Image
    data-test="ImageObject-ImageObjectBox"
    linkedProp={linkedProp}
    style={style}
  />
);

boxImage.type = [schema.ImageObject, schema.VideoObject];

boxImage.topology = allTopologies;

boxImage.property = NS.ontola('imgUrl568x400');

boxImage.propTypes = {
  linkedProp: linkedPropType.isRequired,
  style: PropTypes.shape({
    maxHeight: PropTypes.string,
  }),
};

export default register(boxImage);
