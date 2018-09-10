import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import Parent from '../../../topologies/Parent';

const propTypes = {
  linkedProp: linkedPropType,
};

const IsPartOf = ({ linkedProp }) => {
  if (linkedProp && Object.keys(linkedProp).length === 0 && linkedProp.constructor === Object) {
    return <div data-test="Thing-parent">parent</div>;
  }

  return (
    <Parent>
      <LinkedResourceContainer
        fetch
        forceRender
        data-test="Thing-parent"
        subject={linkedProp}
      />
    </Parent>
  );
};

IsPartOf.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    IsPartOf,
    NS.schema('Thing'),
    [NS.argu('parent'), NS.schema('isPartOf')],
    NS.argu('container')
  ),
  LinkedRenderStore.registerRenderer(
    IsPartOf,
    [NS.schema('Action'), NS.argu('TrashAction'), NS.argu('UntrashAction')],
    NS.schema('object'),
    NS.argu('container')
  ),
];
