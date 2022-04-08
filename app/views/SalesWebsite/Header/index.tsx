import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { Header } from '../../../components/SalesWebsite/Headers/Header';
import { HeaderHomePage } from '../../../components/SalesWebsite/Headers/HeaderHomePage';
import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';
import type { HeaderProps } from '../../../components/SalesWebsite/Headers/HeaderProps';

export enum HeaderTheme {
  Default = 1,
  HomePage,
  ProductPage,
}
export interface SalesHeaderProps {
  subComponent: React.ReactNode;
  theme?: HeaderTheme;
  targetRef?: React.RefObject<HTMLElement>;
}

const headerMap = new Map<HeaderTheme | undefined, React.FC<HeaderProps>>([
  [HeaderTheme.Default, Header],
  [HeaderTheme.HomePage, HeaderHomePage],
]);

const SalesHeader: FC<SalesHeaderProps> = ({ subComponent, theme }) => {
  const [backgroundImage] = useProperty(sales.backgroundImage);
  const [backgroundImageMobile] = useProperty(sales.backgroundImageMobile);
  const [backgroundImageXL] = useProperty(sales.backgroundImageXL);
  const [title] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [buttonLink] = useProperty(sales.buttonLink);
  const [buttonText] = useProperty(sales.buttonText);

  const HeaderComp = headerMap.get(theme) ?? Header;

  return (
    <HeaderComp
      backgroundImageUrl={backgroundImage.value}
      backgroundImageUrlMobile={backgroundImageMobile?.value}
      backgroundImageXL={backgroundImageXL?.value}
      buttonLink={buttonLink?.value}
      buttonText={buttonText?.value}
      subtitle={text?.value}
      title={title.value}
    >
      {subComponent}
    </HeaderComp>
  );
};

SalesHeader.type = sales.Header;
SalesHeader.topology = allTopologies;

export default register(SalesHeader);
