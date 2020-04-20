import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

const DetailImage = ({ linkedProp, title }) => linkedProp && (
  <img
    alt={title}
    className="Detail__image"
    data-test="Detail-image"
    src={linkedProp.value}
  />
);

DetailImage.propTypes = {
  linkedProp: linkedPropType,
  title: PropTypes.string,
};

export default DetailImage;
