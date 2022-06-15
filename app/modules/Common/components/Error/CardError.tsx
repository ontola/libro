import * as schema from '@ontologies/schema';
import { ReturnType, useLink } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import Card from '../../../../topologies/Card';
import { SignInFormLink } from '../../../Auth/components/SignInForm';
import { useCurrentActor } from '../../../Auth/hooks/useCurrentActor';
import Button, { ButtonVariant } from '../Button';
import CardContent from '../Card/CardContent';
import Heading, { HeadingSize, HeadingVariant } from '../Heading';
import HeadingContext from '../Heading/HeadingContext';

import ErrorButtonWithFeedback from './ErrorButtonWithFeedback';
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
      <HeadingContext>
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
      </HeadingContext>
    </Card>
  );
};

export default CardError;
