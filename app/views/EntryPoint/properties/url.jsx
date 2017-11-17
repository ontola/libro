import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

const Url = ({ children, linkedProp }) => {
  const url = new URL(linkedProp);
  const href = url && url.pathname + url.search;
  return (
    <Button className="Button--has-icon" href={href} icon="plus" theme="as-card">
      {children}
    </Button>
  );
};

Url.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Url,
  NS.schema('EntryPoint'),
  NS.schema('url')
);

LinkedRenderStore.registerRenderer(
  Url,
  NS.schema('EntryPoint'),
  NS.schema('url'),
  NS.argu('collection')
);
