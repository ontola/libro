import { isLiteral } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
  useStrings, 
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../topologies';
import { Header } from '../../components/Headers/Header';
import { HeaderHomePage } from '../../components/Headers/HeaderHomePage';
import type { HeaderProps } from '../../components/Headers/HeaderProps';
import sales from '../../ontology/sales';

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
  const [title] = useStrings(schema.name);
  const [text] = useProperty(schema.text);
  const [buttonLink] = useProperty(sales.buttonLink);
  const [buttonText] = useProperty(sales.buttonText);

  const HeaderComp = headerMap.get(theme) ?? Header;

  const subtitle = isLiteral(text) ? text.value : text;

  return (
    <HeaderComp
      backgroundImageUrl={backgroundImage.value}
      backgroundImageUrlMobile={backgroundImageMobile?.value}
      backgroundImageXL={backgroundImageXL?.value}
      buttonLink={buttonLink?.value}
      buttonText={buttonText?.value}
      subtitle={subtitle}
      title={title}
    >
      {subComponent}
    </HeaderComp>
  );
};

SalesHeader.type = sales.Header;
SalesHeader.topology = allTopologies;

export default register(SalesHeader);
