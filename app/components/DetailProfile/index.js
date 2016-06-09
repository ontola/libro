// @flow
import './detailProfile.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

function DetailProfile({ name, url, imageUrl }) {
  return (
    <a href={url} className="detailProfile">
      <img className="detailProfile--image" role="presentation" src={imageUrl}></img>
      <span className="detailProfile--text">{name}</span>
    </a>
  );
}

DetailProfile.propTypes = propTypes

export default DetailProfile;
