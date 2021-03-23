import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import React from 'react';

const useStyle = makeStyles({
  footerImageStyle: {
    backgroundImage: (props: FormFooterImageProps) => `url(${props.linkedProp.value})`,
    marginLeft: '5px',
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
