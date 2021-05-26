import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React from 'react';
import { NavLink } from 'react-router-dom';

import retrievePath from '../../helpers/iris';

export interface CallToActionButtonProps {
  text: string;
  url: string;
  size?: 'small' | 'medium' | 'large';
}

export const CallToActionButton = ({ text, url, size = 'large' }: CallToActionButtonProps): JSX.Element => (
  <Button
    disableElevation
    color="secondary"
    component={NavLink as React.ElementType}
    endIcon={<ChevronRightIcon />}
    size={size}
    to={retrievePath(url)}
    variant="contained"
  >
    {text}
  </Button>
);
