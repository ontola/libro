import { FC, register } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonTheme } from '../../components/Button';
import useErrorReload from '../../hooks/useErrorReload';
import ll from '../../ontology/ll';
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
import { useTitleForStatus } from '../../components/Error/errorMessages';
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
  const titleForStatus = useTitleForStatus(linkRequestStatus);

  return (
    <Button
      small
      icon="exclamation-triangle"
      loading={loading}
      theme={ButtonTheme.Subtle}
      title={titleForStatus}
      onClick={reload}
    >
      <FormattedMessage
        defaultMessage="Retry"
        id="https://app.argu.co/i18n/errors/inlineButton/label"
      />
    </Button>
  );
};

ErrorButtonInline.type = ll.ErrorResource;

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
