import PropTypes from 'prop-types';
import React from 'react';

const PageHeaderImage = ({ alt, src }) => (
  <img
    alt={alt}
    className="PageHeader__circle"
    src={src}
  />
);

PageHeaderImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
};

export default PageHeaderImage;
