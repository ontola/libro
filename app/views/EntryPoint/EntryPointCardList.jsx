import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, linkedPropType } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

const EntryPointCardList = ({
  name,
  onClick,
  url,
}) => {
  const parsedURL = new URL(url.value);
  const href = parsedURL && parsedURL.pathname + parsedURL.search;

  return (
    <Button plain className="Button--CardList" href={href} onClick={onClick}>
      <span>{name.value}</span>
    </Button>
  );
};

EntryPointCardList.propTypes = {
  name: linkedPropType,
  onClick: PropTypes.func,
  url: linkedPropType,
};

export default LinkedRenderStore.registerRenderer(
  link([NS.schema('name'), NS.schema('url')])(EntryPointCardList),
  NS.schema('EntryPoint'),
  RENDER_CLASS_NAME,
  NS.argu('cardList')
);
