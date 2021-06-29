import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import React from 'react';

const useStyle = makeStyles({
  footerImageStyle: {
    alignSelf: 'center',
    backgroundImage: (props: FormFooterImageProps) => `url(${props.linkedProp.value})`,
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
  const classes = useStyle({ linkedProp });

  return (
    <div
      className={`Form__footer-image ${classes.footerImageStyle}`}
      title={ariaLabel}
    />
  );
};

export default FormFooterImage;
