import React, { PropTypes } from 'react';
import { LinkedObjectContainer } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.object,
};

const Image = ({ linkedProp }) => {
  if (!linkedProp) {
    return null;
  } else if (linkedProp &&
    Object.keys(linkedProp).length === 0 &&
    linkedProp.constructor === Object
  ) {
    return <div>image</div>;
  } else if (typeof linkedProp === 'string') {
    return (
      <img
        role="presentation"
        src={linkedProp}
        style={{ float: 'right', maxWidth: '10em' }}
      />
    );
  }
  return (
    <LinkedObjectContainer
      object={linkedProp}
      topology="detail"
    />
  );
};

Image.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Image,
  'http://schema.org/Thing',
  ['http://schema.org/image', 'dbo:thumbnail', 'wdt:P18']
);

export default Image;
