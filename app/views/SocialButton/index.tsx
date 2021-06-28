import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Image from '../../components/Image';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

const SocialButton: FC = () => {
  const [ariaLabel] = useProperty(ontola.ariaLabel);
  const [href] = useProperty(ontola.href);
  const [icon] = useProperty(argu.icon);

  return (
    <a
      aria-label={ariaLabel?.value}
      href={href.value}
      rel="noreferrer noopener"
      target="_blank"
    >
      <Image linkedProp={icon} />
    </a>
  );
};

SocialButton.type = argu.SocialButton;

SocialButton.topology = allTopologies;

export default register(SocialButton);
