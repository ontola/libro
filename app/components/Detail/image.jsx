import React from 'react';

const DetailImage = ({ linkedProp, title }) => linkedProp && (
  <img
    alt={title}
    className="Detail__image"
    data-test="Detail-image"
    src={linkedProp.value}
  />
);

export default DetailImage;
