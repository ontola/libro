import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { Header } from '../../../components/SalesWebsite';
import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';

export interface SalesHeaderProps {
  subComponent: React.ReactNode;
}

const SalesHeader: FC<SalesHeaderProps> = ({ subComponent }) => {
  const [backgroundImage] = useProperty(sales.backgroundImage);
  const [backgroundImageMobile] = useProperty(sales.backgroundImageMobile);
  const [backgroundImageXL] = useProperty(sales.backgroundImageXL);
  const [title] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [buttonLink] = useProperty(sales.buttonLink);
  const [buttonText] = useProperty(sales.buttonText);

  return (
    <Header
      backgroundImageUrl={backgroundImage.value}
      backgroundImageUrlMobile={backgroundImageMobile.value}
      backgroundImageXL={backgroundImageXL.value}
      buttonLink={buttonLink?.value}
      buttonText={buttonText?.value}
      subtitle={text?.value}
      title={title.value}
    >
      {subComponent}
    </Header>
  );
};

SalesHeader.type = sales.Header;
SalesHeader.topology = allTopologies;

export default register(SalesHeader);
