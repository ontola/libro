import { makeStyles } from '@mui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonVariant } from '../../../Common/components/Button';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
}));

interface FormFooterRight {
  crammed?: boolean;
  loading?: boolean;
  onCancel?: (e: any) => void;
  onSubmit?: (e: any) => void;
  submitLabel?: string;
}

const FormFooterRight: React.FC<FormFooterRight> = ({
  children,
  crammed,
  loading,
  onCancel,
  onSubmit,
  submitLabel,
}) => {
  const classes = useStyles();

  if (children) {
    return (
      <div className={classes.wrapper}>
        children
      </div>
    );
  }

  const cancelMessage = (
    <FormattedMessage
      defaultMessage="cancel"
      id="https://app.argu.co/i18n/forms/actions/cancel"
    />
  );

  return (
    <div className={classes.wrapper}>
      {onCancel && (
        <Button
          icon={crammed ? 'trash' : ''}
          variant={ButtonVariant.Transparent}
          onClick={onCancel}
        >
          {!crammed && cancelMessage}
        </Button>
      )}
      <Button
        icon={crammed ? 'send' : ''}
        loading={loading}
        type="submit"
        onClick={onSubmit}
      >
        {!crammed && submitLabel}
      </Button>
    </div>
  );
};

export default FormFooterRight;
