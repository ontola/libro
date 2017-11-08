import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React, { PropTypes } from 'react';

import {
  GeneratedIcon,
} from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './OpinionBubble.scss';
import './properties/creator';

const propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const OpinionBubble = ({
  image,
  name,
}) => (
  <div
    className="OpinionBubble"
    title={name}
  >
    {image &&
      <img
        alt={name}
        className="OpinionBubble__image"
        src={image}
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
    <Property label={[NS.schema('creator'), NS.aod('voter_id')]} />
  </div>
);

LinkedRenderStore.registerRenderer(Vote, [NS.argu('Vote'), NS.aod('Vote'), NS.aod('Count')]);
LinkedRenderStore.registerRenderer(
  Vote,
  [NS.argu('Vote'), NS.aod('Vote'), NS.aod('Count')],
  RENDER_CLASS_NAME,
  NS.argu('collection')
);
LinkedRenderStore.registerRenderer(
  Vote,
  [NS.argu('Vote'), NS.aod('Vote'), NS.aod('Count')],
  RENDER_CLASS_NAME,
  NS.argu('voteSidePage')
);
