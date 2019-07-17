import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../../helpers/iris';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const propTypes = {
  ariaLabel: PropTypes.string,
  linkedProp: linkedPropType,
};

const ThingImageProp = ({ ariaLabel, linkedProp }) => {
  if (!linkedProp) {
    return null;
  } else if (linkedProp
    && Object.keys(linkedProp).length === 0
    && linkedProp.constructor === Object
  ) {
    return <div>image</div>;
  } else if (linkedProp.termType === 'NamedNode' && isFontAwesomeIRI(linkedProp.value)) {
    return <FontAwesome name={normalizeFontAwesomeIRI(linkedProp)} />;
  }

  return (
    <LinkedResourceContainer ariaLabel={ariaLabel} subject={linkedProp} />
  );
};

ThingImageProp.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ThingImageProp,
  NS.schema('Thing'),
  [NS.schema('image'), NS.dbo('thumbnail'), NS.wdt('P18')],
  allTopologies
);
