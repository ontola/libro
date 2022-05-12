import { SomeNode } from 'link-lib';

export interface HeaderProps {
  backgroundImageUrl: string,
  backgroundImageUrlMobile: string,
  backgroundImageXL?: string,
  buttonLink?: string,
  buttonText?: string,
  title: string,
  subtitle?: string | SomeNode,
}
