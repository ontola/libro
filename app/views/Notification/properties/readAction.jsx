import {
  linkedPropType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

const ReadAction = ({ linkedProp, children }) => (
  <div
    onClick={() => LinkedRenderStore.execActionByIRI(linkedProp)}
    onKeyUp={() => LinkedRenderStore.execActionByIRI(linkedProp)}
  >
    {children}
  </div>
);

ReadAction.propTypes = propTypes;

[undefined, NS.argu('collection'), NS.argu('sidebar')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    ReadAction,
    NS.argu('Notification'),
    NS.argu('readAction'),
    top
  );
});

export default URL;
