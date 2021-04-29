import { FC, register } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage, useIntl } from 'react-intl';

import BlurButton from '../../components/BlurButton';
import { NavbarLinkLink } from '../../components/NavbarLink';
import NavbarLinkIcon from '../../components/NavbarLink/NavbarLinkIcon';
import NavbarLinkLabel from '../../components/NavbarLink/NavbarLinkLabel';
import useErrorReload from '../../hooks/useErrorReload';
import ll from '../../ontology/ll';
import { navbarTopology } from '../../topologies/Navbar';
import { errorMessages } from '../../translations/messages';

import { bodyDescriptorForStatus } from './ErrorMessages';
import { ErrorComponentProps } from './helpers';

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
  const bodyDescriptor = bodyDescriptorForStatus(linkRequestStatus);
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

ErrorNavbar.type = ll.ErrorResource;

ErrorNavbar.topology = navbarTopology;

export default register(ErrorNavbar);
