import { register } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage, useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import CardContent from '../../components/Card/CardContent';
import Heading from '../../components/Heading';
import Button from '../../components/Button';
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
import { bodyForStatus, headerForStatus } from './ErrorMessages';
import { propTypes, shouldShowSignIn } from './helpers';

const ErrorCardComp = (props) => {
  const { formatMessage } = useIntl();
  const {
    caughtError,
    error,
    linkRequestStatus,
  } = props;
  const { actorType } = useCurrentActor();

  const err = caughtError || error;

  let mainAction = (
    <ErrorButtonWithFeedback theme="box" {...props}>
      <FormattedMessage
        defaultMessage="Try again"
        id="https://app.argu.co/i18n/errors/retryButton/label"
      />
    </ErrorButtonWithFeedback>
  );
  if (shouldShowSignIn(actorType?.value, linkRequestStatus.status)) {
    mainAction = (
      <SignInFormLink Component={Button} />
    );
  }

  return (
    <Card>
      <CardContent endSpacing>
        <Heading size="2" variant="alert">
          <FontAwesome name="exclamation-triangle" />
          {' '}
          {headerForStatus(formatMessage, linkRequestStatus) || (err && err.name)}
        </Heading>
        <p>{bodyForStatus(formatMessage, linkRequestStatus)}</p>
        {err && <p>{err.message}</p>}
        {__DEVELOPMENT__ && err && <pre>{err.stack}</pre>}
        {mainAction}
      </CardContent>
    </Card>
  );
};

ErrorCardComp.propTypes = propTypes;

export const ErrorCard = withRouter(ErrorCardComp);

ErrorCard.type = ll.ErrorResource;

ErrorCard.topology = [
  alertDialogTopology,
  containerTopology,
  menuTopology,
  cardListTopology,
  gridTopology,
];

export default register(ErrorCard);
