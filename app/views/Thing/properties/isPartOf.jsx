import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const IsPartOf = ({ linkedProp }) => {
  if (linkedProp && Object.keys(linkedProp).length === 0 && linkedProp.constructor === Object) {
    return <div data-test="Thing-parent">parent</div>;
  }
  return (
    <LinkedResourceContainer
      fetch
      forceRender
      data-test="Thing-parent"
      subject={linkedProp}
      topology={NS.argu('parent')}
    />
  );
};

IsPartOf.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  IsPartOf,
  NS.schema('Thing'),
  [NS.argu('parent'), NS.schema('isPartOf')],
  NS.argu('container')
);
