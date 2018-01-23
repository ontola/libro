import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import LRS, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

const ReadAction = ({ linkedProp, children }) => (
  <div
    data-test="Notification-ReadAction"
    onClick={() => LRS.execActionByIRI(linkedProp)}
    onKeyUp={() => LRS.execActionByIRI(linkedProp)}
  >
    {children}
  </div>
);

ReadAction.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ReadAction,
  NS.argu('Notification'),
  NS.argu('readAction'),
  [undefined, NS.argu('collection'), NS.argu('sidebar')]
);
