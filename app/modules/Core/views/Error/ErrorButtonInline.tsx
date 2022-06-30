import { FC, register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonVariant } from '../../../Common/components/Button';
import { useErrorStatus, useTitleForStatus } from '../../../Common/components/Error/errorMessages';
import { ErrorComponentProps } from '../../../Common/components/Error/helpers';
import useErrorReload from '../../../Common/hooks/useErrorReload';
import { ERROR_CLASSES } from '../../../Common/lib/metaData';
import { inlineTopology } from '../../../Common/topologies';
import { attributeListTopology } from '../../../Common/topologies/AttributeList';
import { parentTopology } from '../../../Common/topologies/BreadcrumbsBar';
import { cardTopology } from '../../../Common/topologies/Card';
import { cardFixedTopology } from '../../../Common/topologies/Card/CardFixed';
import { cardFloatTopology } from '../../../Common/topologies/Card/CardFloat';
import { cardMainTopology } from '../../../Common/topologies/Card/CardMain';
import { cardMicroRowTopology } from '../../../Common/topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../../Common/topologies/Card/CardRow';
import { containerFloatTopology } from '../../../Common/topologies/Container/ContainerFloat';
import { detailsBarTopology } from '../../../Common/topologies/DetailsBar';
import { hoverBoxTopology } from '../../../Common/topologies/HoverBox';
import { appMenuTopology } from '../../../Menu/topologies/AppMenu';
import { omniformFieldsTopology } from '../../../Omniform/topologies/OmniformFields/OmniformFields';

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
  appMenuTopology,
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
