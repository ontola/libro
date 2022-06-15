import { ArrowBack } from '@mui/icons-material';
import MUIButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useFormState } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonVariant } from '../../../Common/components/Button';
import { formContext } from '../../../Form/components/Form/FormContext';
import { flowMessages } from '../../lib/messages';

export interface SubmissionPageProps {
  onBack: (key: string) => void;
}

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    position: 'relative',
  },
});

export const SubmissionPage = ({ onBack }: SubmissionPageProps): JSX.Element => {
  const classes = useStyles();
  const { submitting } = React.useContext(formContext);

  const { errors } = useFormState({
    subscription: {
      errors: true,
    },
  });

  const isValid = !errors || Object.keys(errors).length === 0;

  const messages = React.useMemo(() => ({
    wrapUpBody: isValid ? flowMessages.wrapUpBodyText : flowMessages.wrapUpBodyTextInvalid,
    wrapUpTitle: isValid ? flowMessages.wrapUpTitle : flowMessages.wrapUpTitleInvalid,
  }), [isValid]);

  return (
    <div className={classes.wrapper}>
      <Typography variant="h2">
        <FormattedMessage {...messages.wrapUpTitle} />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage {...messages.wrapUpBody} />
      </Typography>
      {isValid ? (
        <Button
          loading={submitting}
          type="submit"
          variant={ButtonVariant.Default}
        >
          <FormattedMessage {...flowMessages.submitButtonLabel} />
        </Button>
      ) : (
        <MUIButton
          startIcon={<ArrowBack />}
          onClick={() => errors && onBack(Object.keys(errors)[0])}
        >
          <FormattedMessage {...flowMessages.submitButtonLabelInvalid} />
        </MUIButton>
      )}
    </div>
  );
};
