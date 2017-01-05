import './OpinionBubble.scss';
import React, { PropTypes } from 'react';
import {
  GeneratedIcon,
} from 'components';

const propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const OpinionBubble = ({
  image,
  name,
}) => (
  <div
    title={name}
    className="OpinionBubble"
  >
    {image &&
      <img
        alt={name}
        src={image}
        className="OpinionBubble__image"
      />
    }
    {!image &&
      <GeneratedIcon
        name={name}
      />
    }
  </div>
);

OpinionBubble.propTypes = propTypes;

export default OpinionBubble;
