import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Arguments = ({ linkedProp }) => <LinkedResourceContainer subject={linkedProp} />;

Arguments.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    Arguments,
    NS.schema('CreativeWork'),
    NS.argu('arguments')
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => <LinkedResourceContainer subject={linkedProp} topology={NS.argu('section')} />,
    NS.schema('CreativeWork'),
    NS.argu('arguments'),
    NS.argu('collection')
  ),
];
