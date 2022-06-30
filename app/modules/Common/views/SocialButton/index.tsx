import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../topologies';
import argu from '../../../Argu/lib/argu';
import ontola from '../../../Core/ontology/ontola';
import Image from '../../components/Image';

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
