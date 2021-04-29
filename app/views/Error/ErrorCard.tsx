import * as schema from '@ontologies/schema';
import {
  FC,
  ReturnType,
  register,
  useLink,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonTheme } from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import Heading, { HeadingSize, HeadingVariant } from '../../components/Heading';
import { SignInFormLink } from '../../components/SignInForm';
import { useCurrentActor } from '../../hooks/useCurrentActor';
import ll from '../../ontology/ll';
import Card from '../../topologies/Card';
import { cardListTopology } from '../../topologies/Card/CardList';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { gridTopology } from '../../topologies/Grid';
import { menuTopology } from '../../topologies/Menu';

import ErrorButtonWithFeedback from './ErrorButtonWithFeedback';
import { bodyDescriptorForStatus, headerDescriptorForStatus } from './ErrorMessages';
import { ErrorComponentProps, shouldShowSignIn } from './helpers';

const propMap = {
  message: schema.text,
  name: schema.name,
};

const dataErrOpts = {
  fetch: false,
  returnType: ReturnType.Literal,
};

const ErrorCard: FC<ErrorComponentProps> = (props) => {
  const {
    caughtError,
    error,
    linkRequestStatus,
  } = props;
  const { actorType } = useCurrentActor();
  const errFromData = useLink(propMap, dataErrOpts);

  const err = caughtError ?? error ?? errFromData;
  const headerDescription = headerDescriptorForStatus(linkRequestStatus);
  const bodyDescriptor = bodyDescriptorForStatus(linkRequestStatus);

  let mainAction = (
    <ErrorButtonWithFeedback theme={ButtonTheme.Box} {...props}>
      <FormattedMessage
        defaultMessage="Try again"
        id="https://app.argu.co/i18n/errors/retryButton/label"
      />
    </ErrorButtonWithFeedback>
  );
  if (shouldShowSignIn(actorType?.value, linkRequestStatus)) {
    mainAction = (
      <SignInFormLink Component={Button} />
    );
  }

  return (
    <Card>
      <CardContent endSpacing>
        <Heading size={HeadingSize.LG} variant={HeadingVariant.Alert}>
          <FontAwesome name="exclamation-triangle" />
          {' '}
          {headerDescription ? <FormattedMessage {...headerDescription} /> : (err && err.name)}
        </Heading>
        {bodyDescriptor ? <p><FormattedMessage {...bodyDescriptor} /></p> : null}
        {err && <p>{err.message}</p>}
        {__DEVELOPMENT__ && err && <pre>{err.stack}</pre>}
        {mainAction}
      </CardContent>
    </Card>
  );
};

ErrorCard.type = ll.ErrorResource;

ErrorCard.topology = [
  alertDialogTopology,
  containerTopology,
  menuTopology,
  cardListTopology,
  gridTopology,
];

export default register(ErrorCard);
