import MUIButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { flowMessages } from '../../translations/messages';
import Button, { ButtonTheme } from '../Button';
import { FormContext } from '../Form/Form';

export interface SubmissionPageProps {
  formInvalid?: boolean;
  onBack: () => void;
}

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    position: 'relative',
  },
});

export const SubmissionPage = ({ formInvalid, onBack }: SubmissionPageProps): JSX.Element => {
  const classes = useStyles();
  const { submitting } = React.useContext(FormContext);

  return (
    <div className={classes.wrapper}>
      <Typography variant="h2">
        {formInvalid ? (
          <FormattedMessage {...flowMessages.wrapUpTitleInvalid} />
        ) : (
          <FormattedMessage {...flowMessages.wrapUpTitle} />
        )}
      </Typography>
      <Typography variant="body1">
        {formInvalid ? (
          <FormattedMessage {...flowMessages.wrapUpBodyTextInvalid} />
        ) : (
          <FormattedMessage {...flowMessages.wrapUpBodyText} />
        )}
      </Typography>
      {formInvalid ? (
        <MUIButton
          startIcon={<ArrowBack />}
          onClick={onBack}
        >
          <FormattedMessage {...flowMessages.submitButtonLabelInvalid} />
        </MUIButton>
      ) : (
        <Button
          loading={submitting}
          theme={ButtonTheme.Submit}
          type="submit"
        >
          <FormattedMessage {...flowMessages.submitButtonLabel} />
        </Button>
      )}
    </div>
  );
};
