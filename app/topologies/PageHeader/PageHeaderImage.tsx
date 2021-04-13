import React from 'react';

export interface PageHeaderImageProps {
  alt: string;
  src: string;
}

const PageHeaderImage = ({ alt, src }: PageHeaderImageProps): JSX.Element => (
  <img
    alt={alt}
    className="PageHeader__circle"
    src={src}
  />
);

export default PageHeaderImage;
