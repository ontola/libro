import { SomeTerm } from '@ontologies/core';
import React from 'react';

interface PropTypes {
  ariaLabel?: string;
  linkedProp: SomeTerm;
}

const FormFooterImage: React.FC<PropTypes> = ({ ariaLabel, linkedProp }) => (
  <div
    className="Form__footer-image"
    style={{ backgroundImage: `url(${linkedProp.value})` }}
    title={ariaLabel}
  />
);

export default FormFooterImage;
