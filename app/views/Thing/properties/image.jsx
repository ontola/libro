import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const FABase = 'http://fontawesome.io/icon/';
const propTypes = {
  linkedProp: linkedPropType,
};

const ThingImageProp = ({ linkedProp }) => {
  if (!linkedProp) {
    return null;
  } else if (linkedProp &&
    Object.keys(linkedProp).length === 0 &&
    linkedProp.constructor === Object
  ) {
    return <div>image</div>;
  } else if (typeof linkedProp === 'string' && linkedProp.startsWith(FABase)) {
    return <FontAwesome name={linkedProp.split(FABase)[1]} />;
  }
  return (
    <LinkedObjectContainer
      object={linkedProp}
      topology={NS.argu('detail')}
    />
  );
};

ThingImageProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  ThingImageProp,
  NS.schema('Thing'),
  [NS.schema('image'), NS.dbo('thumbnail'), NS.wdt('P18')]
);

[NS.argu('sidebar'), NS.argu('sidebarBlock')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    ThingImageProp,
    NS.schema('Thing'),
    [NS.schema('image'), NS.dbo('thumbnail'), NS.wdt('P18')],
    top
  );
});

export default ThingImageProp;
