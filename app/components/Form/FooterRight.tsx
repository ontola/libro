import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonVariant } from '../Button';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
}));

interface FormFooterRight {
  loading?: boolean;
  onCancel?: (e: any) => void;
  onSubmit?: (e: any) => void;
  submitLabel?: string;
}

const FormFooterRight: React.FC<FormFooterRight> = ({
  children,
  loading,
  onCancel,
  onSubmit,
  submitLabel,
}) => {
  const classes = useStyles();

  const cancelButton = onCancel && (
    <Button
      variant={ButtonVariant.Transparent}
      onClick={onCancel}
    >
      <FormattedMessage
        defaultMessage="cancel"
        id="https://app.argu.co/i18n/forms/actions/cancel"
      />
    </Button>
  );

  return (
    <div className={classes.wrapper}>
      {children ?? (
        <React.Fragment>
          {cancelButton}
          <Button
            loading={loading}
            type="submit"
            onClick={onSubmit}
          >
            {submitLabel}
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

export default FormFooterRight;
