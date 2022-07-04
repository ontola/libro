import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonVariant } from '../../components/Button';
import { useErrorStatus, useTitleForStatus } from '../../components/Error/errorMessages';
import { ErrorComponentProps } from '../../components/Error/helpers';
import useErrorReload from '../../hooks/useErrorReload';
import { ERROR_CLASSES } from '../../lib/metaData';
import { inlineTopology } from '../../topologies';
import { attributeListTopology } from '../../topologies/AttributeList';
import { parentTopology } from '../../topologies/BreadcrumbsBar';
import { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { hoverBoxTopology } from '../../topologies/HoverBox';

export const ErrorButtonInline = ({
  linkRequestStatus,
  reloadLinkedObject,
  subject,
}: ErrorComponentProps): JSX.Element => {
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

export default LinkedRenderStore.registerRenderer(
  ErrorButtonInline,
  ERROR_CLASSES,
  RENDER_CLASS_NAME,
  [
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
    parentTopology,
  ],
);
