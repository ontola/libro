import { FC, register } from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { errorMessages } from '../../../translations/messages';
import { bodyDescriptorForStatus, useErrorStatus } from '../../Common/components/Error/errorMessages';
import { ErrorComponentProps } from '../../Common/components/Error/helpers';
import useErrorReload from '../../Common/hooks/useErrorReload';
import { ERROR_CLASSES } from '../../Common/lib/metaData';
import { NavbarLinkLink } from '../components/NavbarLink';
import { navbarTopology } from '../topologies';

const ErrorNavbar: FC<ErrorComponentProps> = (props) => {
  const {
    linkRequestStatus,
    reloadLinkedObject,
    subject,
  } = props;
  const intl = useIntl();
  const {
    loading,
    reload,
  } = useErrorReload(subject, reloadLinkedObject);

  const retryText = intl.formatMessage(errorMessages.clickRetry);
  const statusCode = useErrorStatus(linkRequestStatus);
  const bodyDescriptor = bodyDescriptorForStatus(statusCode);
  const bodyText = bodyDescriptor ? intl.formatMessage(bodyDescriptor) : null;

  return (
    <NavbarLinkLink
      icon={loading ? 'spinner' : 'exclamation-triangle'}
      label={(
        <FormattedMessage
          defaultMessage="Retry"
          id="https://app.argu.co/i18n/errors/inlineButton/label"
        />
      )}
      spin={loading}
      title={`${bodyText} ${retryText}`}
      onClick={reload}
    />
  );
};

ErrorNavbar.type = ERROR_CLASSES;

ErrorNavbar.topology = navbarTopology;

export default register(ErrorNavbar);
