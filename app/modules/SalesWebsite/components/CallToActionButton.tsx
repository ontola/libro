import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import React from 'react';

import Link from '../../Common/components/Link';

export interface CallToActionButtonProps {
  text: string;
  url: string;
  size?: 'small' | 'medium' | 'large';
  trackingId?: string;
}

export const CallToActionButton = ({
  text,
  url,
  size = 'large',
  trackingId,
}: CallToActionButtonProps): JSX.Element => (
  <Button
    disableElevation
    allowExternal={false}
    color="secondary"
    component={Link as React.ElementType}
    endIcon={<ChevronRightIcon />}
    id={trackingId}
    size={size}
    to={url}
    variant="contained"
  >
    {text}
  </Button>
);
