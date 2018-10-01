import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, linkType } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import ButtonWithFeedback from '../../components/ButtonWithFeedback';
import { NS } from '../../helpers/LinkedRenderStore';
import { countInParentheses } from '../../helpers/numbers';
import { allTopologiesExcept } from '../../topologies';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { containerTopology } from '../../topologies/Container';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

import EntryPointButton from './EntryPointButton';
import EntryPointCardFloat from './EntryPointCardFloat';
import EntryPointContainer from './EntryPointContainer';
import EntryPointOmiform from './EntryPointOmiform';

const FABase = 'http://fontawesome.io/icon/';

const EntryPoint = ({
  count,
  httpMethod,
  image,
  name,
  onClick,
  url,
  ...props
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
  count: linkType,
  httpMethod: linkType,
  image: linkType,
  name: linkType,
  onClick: PropTypes.func,
  url: linkType,
};

export default [
  EntryPointButton,
  EntryPointCardFloat,
  EntryPointContainer,
  EntryPointOmiform,
  LinkedRenderStore.registerRenderer(
    link([NS.schema('image'), NS.schema('name'), NS.schema('url'), NS.schema('httpMethod')])(EntryPoint),
    NS.schema('EntryPoint'),
    RENDER_CLASS_NAME,
    allTopologiesExcept(
      containerTopology,
      omniformFieldsTopology,
      cardFloatTopology,
      cardListTopology
    )
  ),
];
