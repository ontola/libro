import { makeStyles } from '@mui/styles';
import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { useStrings } from 'link-redux';
import React from 'react';

const useStyle = makeStyles({
  footerImageStyle: {
    alignSelf: 'center',
    backgroundSize: 'cover',
    borderRadius: '999px',
    height: '1.3em',
    width: '1.3em',
  },
});

export interface FormFooterImageProps {
  ariaLabel?: string;
  linkedProp: SomeTerm;
}

const FormFooterImage = ({ ariaLabel, linkedProp }: FormFooterImageProps): JSX.Element => {
  const classes = useStyle();

  const [alt] = useStrings([schema.description, schema.caption]);

  return (
    <div
      className={`Form__footer-image ${classes.footerImageStyle}`}
      style={{
        backgroundImage: `url(${linkedProp.value})`,
      }}
      title={ariaLabel ?? alt}
    />
  );
};

export default FormFooterImage;
