import { makeStyles } from '@mui/styles';
import { SomeTerm } from '@ontologies/core';
import React from 'react';

import { ImageBaseProps } from '../../../Common/components/Image';

export interface NavbarLinkImageProps extends ImageBaseProps {
  linkedProp: SomeTerm;
}

const useStyles = makeStyles(() => ({
  image: {
    backgroundSize: 'cover',
    border: '1px solid #b3b3b3',
    borderRadius: '100%',
    height: '1.5em',
    minWidth: '1.5em',
    width: '1.5em',
  },
  wrapper: {
    '& img': {
      height: '100%',
      marginLeft: '-.5em',
    },
    'height': '100%',
    'paddingLeft': '.5em',
  },
}));

const NavbarLinkImage = ({ ariaLabel, linkedProp }: NavbarLinkImageProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      aria-label={ariaLabel}
      className={classes.image}
      style={{ backgroundImage: `url(${linkedProp.value})` }}
    />
  );
};

export const NavbarLinkImageWrapper: React.FC<ImageBaseProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {children}
    </div>
  );
};

export default NavbarLinkImage;
