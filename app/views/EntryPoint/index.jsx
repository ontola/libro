import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, linkedPropType } from 'link-redux';
import React from 'react';

import { Button } from '../../components';
import { allTopologies, NS } from '../../helpers/LinkedRenderStore';

const EntryPoint = ({ name, url }) => {
  const parsedURL = new URL(url.value);
  const href = parsedURL && parsedURL.pathname + parsedURL.search;

  return (
    <Button className="Button--has-icon" href={href} icon="plus" theme="transparant">
      <span>{name.value}</span>
    </Button>
  );
};

EntryPoint.propTypes = {
  name: linkedPropType,
  url: linkedPropType,
};

export default LinkedRenderStore.registerRenderer(
  link([NS.schema('name'), NS.schema('url')])(EntryPoint),
  NS.schema('EntryPoint'),
  RENDER_CLASS_NAME,
  allTopologies
);
