import './OpinionBubble.scss';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
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
    {!image && name &&
      <GeneratedIcon
        name={name}
      />
    }
  </div>
);

OpinionBubble.propTypes = propTypes;

export default OpinionBubble;

const Vote = () => (
  <div className="OpinionBubble" >
    <Property label={['schema:creator', 'aod:voter_id']} />
  </div>
);

LinkedRenderStore.registerRenderer(Vote, ['argu:Vote', 'aod:Vote', 'aod:Count']);
LinkedRenderStore.registerRenderer(
  Vote,
  ['argu:Vote', 'aod:Vote', 'aod:Count'],
  RENDER_CLASS_NAME,
  'collection'
);

import './properties/creator';
