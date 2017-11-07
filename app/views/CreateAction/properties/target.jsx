import { linkedPropType } from 'link-redux';
import React, { PropTypes } from 'react';

import { Button } from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

const Target = ({ children, linkedProp }) => {
  const url = new URL(linkedProp);
  const href = url && url.pathname + url.search;
  return (
    <Button className="Button--has-icon" href={href} icon="plus" theme="as-card">
      {children}
    </Button>
  );
};

Target.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Target,
  NS.schema('CreateAction'),
  NS.schema('target')
);

export default Target;
