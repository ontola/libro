import {
  Container,
  ContainerProps,
  PaperProps,
} from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonVariant } from '../../components/Button';
import { DialogSize } from '../../middleware/ontolaMiddleware';
import { dialogMessages } from '../../translations/messages';

import { useDialogContainerStyles } from './dialogStyles';

type PaperAndContainerProps = Partial<ContainerProps> & Partial<PaperProps>;

interface DialogContainerProps extends PaperAndContainerProps {
  close: () => void;
}

export const DialogContainer: React.FC<DialogContainerProps> = ({
  children,
  close,
  ...props
}) => {
  const classes = useDialogContainerStyles({ maxWidth: props.maxWidth });

  return (
    <div className={classes.dialogWrapper}>
      <div className={classes.closeButtonArea}>
        <Container
          className={classes.closeButtonContainer}
          maxWidth={DialogSize.Lg}
        >
          <Button
            className={classes.closeButton}
            edge="start"
            icon="long-arrow-left"
            variant={ButtonVariant.Transparent}
            onClick={close}
          >
            <FormattedMessage {...dialogMessages.back} />
          </Button>
        </Container>
      </div>
      <div className={classes.childWrapper}>
        {children}
      </div>
    </div>
  );
};
