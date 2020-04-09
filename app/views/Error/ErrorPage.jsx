import { register } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage, useIntl } from 'react-intl';

import CardContent from '../../components/Card/CardContent';
import Heading from '../../components/Heading';
import LinkDuo from '../../components/LinkDuo';
import Button from '../../components/Button';
import { SignInFormLink } from '../../components/SignInForm';
import { useCurrentActor } from '../../hooks/useCurrentActor';
import ll from '../../ontology/ll';
import Card from '../../topologies/Card';
import Container from '../../topologies/Container';
import { pageTopology } from '../../topologies/Page';

import ErrorButtonWithFeedback from './ErrorButtonWithFeedback';
import { bodyForStatus, headerForStatus } from './ErrorMessages';
import { propTypes, shouldShowSignIn } from './helpers';

export const ErrorPage = (props) => {
  const { actorType } = useCurrentActor();
  const { formatMessage } = useIntl();
  const {
    caughtError,
    error,
    linkRequestStatus,
  } = props;

  const err = caughtError || error;

  let cardAction = (
    <ErrorButtonWithFeedback theme="box" {...props}>
      <FormattedMessage
        defaultMessage="Try again"
        id="https://app.argu.co/i18n/errors/retryButton/label"
      />
    </ErrorButtonWithFeedback>
  );

  if (shouldShowSignIn(actorType?.value, linkRequestStatus.status)) {
    cardAction = (
      <SignInFormLink Component={Button} />
    );
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Heading size="1" variant="alert">
            <FontAwesome name="exclamation-triangle" />
            {' '}
            {headerForStatus(formatMessage, linkRequestStatus) || (err && err.name)}
          </Heading>
          {bodyForStatus(formatMessage, linkRequestStatus)}
          {err && <p>{err.message}</p>}
          {__DEVELOPMENT__ && err && <pre>{err.stack}</pre>}
          <p>
            <FormattedMessage
              defaultMessage="Is this an error?"
              id="https://app.argu.co/i18n/errors/mistaken"
            />
            {' '}
            <LinkDuo
              style={{ textDecoration: 'underline' }}
              to="https://argu.freshdesk.com/support/tickets/new"
            >
              <FormattedMessage
                defaultMessage="Let us know."
                id="https://app.argu.co/i18n/errors/informRequest"
              />
            </LinkDuo>
          </p>
        </CardContent>
        {cardAction}
      </Card>
    </Container>
  );
};

ErrorPage.propTypes = propTypes;

ErrorPage.type = ll.ErrorResource;

ErrorPage.topology = pageTopology;

export default register(ErrorPage);
