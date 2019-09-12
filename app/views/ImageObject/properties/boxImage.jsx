import { linkedPropType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Image } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const boxImage = ({ linkedProp, style }) => (
  <Image linkedProp={linkedProp} style={style} />
);

boxImage.type = [NS.schema('ImageObject'), NS.schema('VideoObject')];

boxImage.topology = allTopologies;

boxImage.property = NS.argu('imgUrl568x400');

boxImage.propTypes = {
  linkedProp: linkedPropType.isRequired,
  style: PropTypes.shape({
    maxHeight: PropTypes.string,
  }),
};

export default register(boxImage);
