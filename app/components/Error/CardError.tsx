import * as schema from '@ontologies/schema';
import {
  ReturnType,
  useLink,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonVariant } from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import ErrorButtonWithFeedback from '../../components/Error/ErrorButtonWithFeedback';
import Heading, {
  HeadingSize,
  HeadingVariant,
} from '../../components/Heading';
import { SignInFormLink } from '../../components/SignInForm';
import { useCurrentActor } from '../../hooks/useCurrentActor';
import Card from '../../topologies/Card';

import {
  bodyDescriptorForStatus,
  headerDescriptorForStatus,
  useErrorStatus,
} from './errorMessages';
import { ErrorComponentProps, shouldShowSignIn } from './helpers';

const propMap = {
  message: schema.text,
  name: schema.name,
};

const dataErrOpts = {
  fetch: false,
  returnType: ReturnType.Literal,
};

const CardError = (props: ErrorComponentProps): JSX.Element => {
  const {
    caughtError,
    error,
    linkRequestStatus,
  } = props;
  const { actorType } = useCurrentActor();
  const errFromData = useLink(propMap, dataErrOpts);

  const err = caughtError ?? error ?? errFromData;
  const statusCode = useErrorStatus(linkRequestStatus);
  const headerDescription = headerDescriptorForStatus(statusCode);
  const bodyDescriptor = bodyDescriptorForStatus(statusCode);

  let mainAction = (
    <ErrorButtonWithFeedback
      variant={ButtonVariant.Box}
      {...props}
    >
      <FormattedMessage
        defaultMessage="Try again"
        id="https://app.argu.co/i18n/errors/retryButton/label"
      />
    </ErrorButtonWithFeedback>
  );

  if (shouldShowSignIn(actorType?.value, statusCode)) {
    mainAction = (
      <SignInFormLink Component={Button} />
    );
  }

  return (
    <Card>
      <CardContent endSpacing>
        <Heading
          size={HeadingSize.LG}
          variant={HeadingVariant.Alert}
        >
          <FontAwesome name="exclamation-triangle" />
          {' '}
          {headerDescription ? <FormattedMessage {...headerDescription} /> : (err && err.name)}
        </Heading>
        {bodyDescriptor ? (
          <p>
            <FormattedMessage {...bodyDescriptor} />
          </p>
        ) : null}
        {err && (
          <p>
            {err.message}
          </p>
        )}
        {__DEVELOPMENT__ && err && (
          <pre>
            {err.stack}
          </pre>
        )}
        {mainAction}
      </CardContent>
    </Card>
  );
};

export default CardError;
