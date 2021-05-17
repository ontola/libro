import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Image from '../../../components/Image';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

interface PictureSetProps {
  className: string,
}

const PictureSet: FC<PictureSetProps> = ({ className }) => {
  const [alt] = useProperty(ontola.alt);
  const [ariaLabel] = useProperty(ontola.ariaLabel);

  const [apng] = useProperty(ontola['format/apng']);
  const [avif] = useProperty(ontola['format/avif']);
  const [gif] = useProperty(ontola['format/gif']);
  const [jpg] = useProperty(ontola['format/jpg']);
  const [png] = useProperty(ontola['format/png']);
  const [svg] = useProperty(ontola['format/svg']);
  const [webp] = useProperty(ontola['format/webp']);
  const mostConservative = svg ?? png ?? jpg ?? gif ?? webp ?? apng ?? avif;

  return (
    <picture>
      {svg && <source srcSet={svg.value} type="image/svg+xml" />}
      {avif && <source srcSet={avif.value} type="image/avif" />}
      {webp && <source srcSet={webp.value} type="image/webp" />}
      {apng && <source srcSet={apng.value} type="image/apng" />}
      {gif && <source srcSet={gif.value} type="image/gif" />}
      {jpg && <source srcSet={jpg.value} type="image/jpg" />}
      {png && <source srcSet={png.value} type="image/png" />}

      <Image
        alt={alt?.value}
        ariaLabel={ariaLabel?.value}
        className={className}
        linkedProp={mostConservative}
      />
    </picture>
  );
};

PictureSet.type = ontola.PictureSet;

PictureSet.topology = allTopologies;

export default [
  ...register(PictureSet),
];
