import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonProps } from '../Button';
import useErrorReload from '../../hooks/useErrorReload';

import { ErrorComponentProps } from './helpers';
import { useTitleForStatus } from './errorMessages';

const ErrorButtonWithFeedback = (props: ErrorComponentProps & ButtonProps): JSX.Element => {
  const {
    children,
    linkRequestStatus,
    reloadLinkedObject,
    subject,
  } = props;
  const {
    loading,
    reload,
  } = useErrorReload(subject, reloadLinkedObject);
  const titleForStatus = useTitleForStatus(linkRequestStatus);

  return (
    <Button
      icon="refresh"
      loading={loading}
      title={titleForStatus}
      onClick={reload}
      {...props}
    >
      {children ?? (
        <FormattedMessage
          defaultMessage="Retry"
          id="https://app.argu.co/i18n/errors/inlineButton/label"
        />
      )}
    </Button>
  );
};

export default ErrorButtonWithFeedback;
