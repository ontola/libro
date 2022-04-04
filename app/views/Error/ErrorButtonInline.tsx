import { FC, register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonVariant } from '../../components/Button';
import { ERROR_CLASSES } from '../../helpers/metaData';
import useErrorReload from '../../hooks/useErrorReload';
import {
  attributeListTopology,
  cardFixedTopology,
  cardFloatTopology,
  cardMainTopology,
  cardMicroRowTopology,
  cardRowTopology,
  cardTopology,
  containerFloatTopology,
  detailsBarTopology,
  hoverBoxTopology,
  inlineTopology,
  omniformFieldsTopology,
  parentTopology,
} from '../../topologies';
import { useErrorStatus, useTitleForStatus } from '../../components/Error/errorMessages';
import { ErrorComponentProps } from '../../components/Error/helpers';

const ErrorButtonInline: FC<ErrorComponentProps> = ({
  linkRequestStatus,
  reloadLinkedObject,
  subject,
}) => {
  const {
    loading,
    reload,
  } = useErrorReload(subject, reloadLinkedObject);
  const statusCode = useErrorStatus(linkRequestStatus);
  const titleForStatus = useTitleForStatus(statusCode);

  return (
    <Button
      small
      icon="exclamation-triangle"
      loading={loading}
      title={titleForStatus}
      variant={ButtonVariant.Subtle}
      onClick={reload}
    >
      <FormattedMessage
        defaultMessage="Retry"
        id="https://app.argu.co/i18n/errors/inlineButton/label"
      />
    </Button>
  );
};

ErrorButtonInline.type = ERROR_CLASSES;

ErrorButtonInline.topology = [
  attributeListTopology,
  cardFixedTopology,
  cardFloatTopology,
  cardTopology,
  cardMainTopology,
  cardMicroRowTopology,
  cardRowTopology,
  containerFloatTopology,
  detailsBarTopology,
  hoverBoxTopology,
  inlineTopology,
  omniformFieldsTopology,
  parentTopology,
];

export default register(ErrorButtonInline);
