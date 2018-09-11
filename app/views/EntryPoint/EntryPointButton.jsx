import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  linkType,
  subjectType,
  topologyType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';

const defaultTopology = NS.argu('cardList');

const EntryPointButton = ({
  name,
  onClick,
  subject,
  topology,
}) => {
  const parsedURL = new URL(subject.value);
  const href = parsedURL && parsedURL.pathname + parsedURL.search;
  const className = topology === defaultTopology ? 'CardList' : 'CardFloat';

  return (
    <Button plain className={`Button--${className}`} href={href} onClick={onClick}>
      {name.value}
    </Button>
  );
};

EntryPointButton.propTypes = {
  name: linkType,
  onClick: PropTypes.func,
  subject: subjectType,
  topology: topologyType,
};

export default LinkedRenderStore.registerRenderer(
  link([NS.schema('name')])(EntryPointButton),
  NS.schema('EntryPoint'),
  RENDER_CLASS_NAME,
  [cardFloatTopology, cardListTopology]
);
