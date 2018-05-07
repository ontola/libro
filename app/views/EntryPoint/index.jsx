import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, linkedPropType } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import ButtonWithFeedback from '../../components/ButtonWithFeedback';
import { allTopologies, NS } from '../../helpers/LinkedRenderStore';
import { countInParentheses } from '../../helpers/numbers';

const FABase = 'http://fontawesome.io/icon/';

const EntryPoint = ({
  count,
  httpMethod,
  image,
  name,
  onClick,
  url,
  ...props,
}) => {
  const label = `${name.value} ${countInParentheses(count)}`;

  const icon = image && image.value.startsWith(FABase) ? image.value.slice(FABase.length) : 'plus';

  if (httpMethod && httpMethod.value !== 'get') {
    return (
      <ButtonWithFeedback
        className="Button--has-icon"
        icon={icon}
        theme="transparant"
        onClick={onClick}
        {...props}
      >
        <span>{label}</span>
      </ButtonWithFeedback>
    );
  }

  const parsedURL = new URL(url.value);
  const href = parsedURL && parsedURL.pathname + parsedURL.search;

  return (
    <Button className="Button--has-icon" href={href} icon={icon} theme="transparant">
      <span>{label}</span>
    </Button>
  );
};

EntryPoint.propTypes = {
  count: linkedPropType,
  httpMethod: linkedPropType,
  image: linkedPropType,
  name: linkedPropType,
  onClick: PropTypes.func,
  url: linkedPropType,
};

export default LinkedRenderStore.registerRenderer(
  link([NS.schema('image'), NS.schema('name'), NS.schema('url'), NS.schema('httpMethod')])(EntryPoint),
  NS.schema('EntryPoint'),
  RENDER_CLASS_NAME,
  allTopologies
);
