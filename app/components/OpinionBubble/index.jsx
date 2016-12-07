import './OpinionBubble.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const OpinionBubble = ({
  image,
  name,
}) => (
  <div className="OpinionBubble">
    <img alt={name} src={image} className="OpinionBubble__image" />
  </div>
);

OpinionBubble.propTypes = propTypes;

export default OpinionBubble;
