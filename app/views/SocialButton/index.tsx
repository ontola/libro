import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

const SocialButton: FC = () => {
  const [href] = useProperty(ontola.href);
  const [icon] = useProperty(argu.ns('icon'));

  return (
    <a href={href.value}>
      <FontAwesome name={icon.value} />
    </a>
  );
};

SocialButton.type = argu.SocialButton;
SocialButton.topology = allTopologies;

export default register(SocialButton);
