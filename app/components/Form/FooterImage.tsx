import { SomeTerm } from '@ontologies/core';
import React from 'react';

export interface FormFooterImageProps {
  ariaLabel?: string;
  linkedProp: SomeTerm;
}

const FormFooterImage = ({ ariaLabel, linkedProp }: FormFooterImageProps): JSX.Element => (
  <div
    className="Form__footer-image"
    style={{ backgroundImage: `url(${linkedProp.value})` }}
    title={ariaLabel}
  />
);

export default FormFooterImage;
