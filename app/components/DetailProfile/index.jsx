// @flow
import React, { PropTypes } from 'react';
import { Detail } from '../';

const propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

function DetailProfile({ name, url, imageUrl }) {
  return (
    <Detail imageUrl={imageUrl} text={name} url={url} />
  );
}

DetailProfile.propTypes = propTypes;

export default DetailProfile;
