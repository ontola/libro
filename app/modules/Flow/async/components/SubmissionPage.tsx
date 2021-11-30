import MUIButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useFormState } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonTheme } from '../../../../components/Button';
import { FormContext } from '../../../../components/Form/Form';
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
  const { submitting } = React.useContext(FormContext);

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
          theme={ButtonTheme.Default}
          type="submit"
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
