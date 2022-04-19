import { FC, register } from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button, { ButtonVariant } from '../../components/Button';
import { SignInFormLink } from '../../components/SignInForm';
import { ERROR_CLASSES } from '../../helpers/metaData';
import { useCurrentActor } from '../../hooks/useCurrentActor';
import useErrorReload from '../../hooks/useErrorReload';
import { attributeListTopology } from '../../topologies/AttributeList';
import { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { hoverBoxTopology } from '../../topologies/HoverBox';
import { inlineTopology } from '../../topologies/Inline';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';
import { parentTopology } from '../../topologies/Parent';
import {
  bodyDescriptorForStatus,
  headerDescriptorForStatus,
  useErrorStatus,
} from '../../components/Error/errorMessages';
import { ErrorComponentProps, shouldShowSignIn } from '../../components/Error/helpers';

const retryDescription = {
  defaultMessage: 'Retry',
  id: 'https://app.argu.co/i18n/errors/inlineButton/label',
};

const ErrorButtonInline: FC<ErrorComponentProps> = ({
  linkRequestStatus,
  reloadLinkedObject,
  subject,
}) => {
  const {
    loading,
    reload,
  } = useErrorReload(subject, reloadLinkedObject);
  const intl = useIntl();
  const { actorType } = useCurrentActor();
  const statusCode = useErrorStatus(linkRequestStatus);
  const headerDescription = headerDescriptorForStatus(statusCode);
  const bodyDescription = bodyDescriptorForStatus(statusCode);

  if (shouldShowSignIn(actorType?.value, statusCode)) {
    return (
      <SignInFormLink Component={Button} />
    );
  }

  return (
    <Button
      small
      icon="exclamation-triangle"
      loading={loading}
      title={intl.formatMessage(bodyDescription ?? retryDescription)}
      variant={ButtonVariant.Subtle}
      onClick={reload}
    >
      <FormattedMessage {...(headerDescription ?? retryDescription)} />
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
