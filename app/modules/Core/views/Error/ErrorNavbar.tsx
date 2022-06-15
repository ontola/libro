import { FC, register } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage, useIntl } from 'react-intl';

import { navbarTopology } from '../../../../topologies';
import { errorMessages } from '../../../../translations/messages';
import BlurButton from '../../../Common/components/BlurButton';
import { bodyDescriptorForStatus, useErrorStatus } from '../../../Common/components/Error/errorMessages';
import { ErrorComponentProps } from '../../../Common/components/Error/helpers';
import useErrorReload from '../../../Common/hooks/useErrorReload';
import { ERROR_CLASSES } from '../../../Common/lib/metaData';
import { NavbarLinkLink } from '../../../NavBar/components/NavbarLink';
import NavbarLinkIcon from '../../../NavBar/components/NavbarLink/NavbarLinkIcon';
import NavbarLinkLabel from '../../../NavBar/components/NavbarLink/NavbarLinkLabel';

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

  return (
    <BlurButton
      className="NavbarLink"
      style={{
        cursor: 'pointer',
      }}
      title={`${bodyText} ${retryText}`}
      onClick={reload}
    >
      <NavbarLinkIcon>
        <FontAwesome
          name={loading ? 'spinner' : 'exclamation-triangle'}
          spin={loading}
        />
      </NavbarLinkIcon>
      <NavbarLinkLabel>
        <FormattedMessage
          defaultMessage="Retry"
          id="https://app.argu.co/i18n/errors/inlineButton/label"
        />
      </NavbarLinkLabel>
    </BlurButton>
  );
};

ErrorNavbar.type = ERROR_CLASSES;

ErrorNavbar.topology = navbarTopology;

export default register(ErrorNavbar);
