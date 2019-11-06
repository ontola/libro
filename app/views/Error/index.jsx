import rdf from '@ontologies/core';
import HttpStatus from 'http-status-codes';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import {
  CardContent,
  Heading,
  LinkDuo,
} from '../../components';
import Button from '../../components/Button';
import { SignInFormLink } from '../../components/SignInForm';
import { NS } from '../../helpers/LinkedRenderStore';
import { useCurrentActor } from '../../hooks/useCurrentActor';
import { attributeListTopology } from '../../topologies/AttributeList';
import Card, { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import Container, { containerTopology } from '../../topologies/Container';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { alertDialogTopology } from '../../topologies/Dialog';
import { menuTopology } from '../../topologies/Menu';
import { gridTopology } from '../../topologies/Grid';
import { hoverBoxTopology } from '../../topologies/HoverBox';
import { inlineTopology } from '../../topologies/Inline';
import { navbarTopology } from '../../topologies/Navbar';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { voteBubbleTopology } from '../../topologies/VoteBubble';
import { voteEventResultTopology } from '../../topologies/VoteEventResult';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';
import { parentTopology } from '../../topologies/Parent';
import { tabPaneTopology } from '../../topologies/TabPane';

import ErrorButtonWithFeedback from './ErrorButtonWithFeedback';
import ErrorButtonInline from './ErrorButtonInline';
import { bodyForStatus, headerForStatus } from './ErrorMessages';
import ErrorButtonHeader from './ErrorButtonHeader';

const shouldShowSignIn = (userType, status) => userType === 'GuestUser'
  && [HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN].includes(status);

const propTypes = {
  caughtError: PropTypes.instanceOf(Error),
  error: PropTypes.instanceOf(Error),
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  reloadLinkedObject: PropTypes.func.isRequired,
  userType: PropTypes.oneOf(['GuestUser', 'ConfirmedUser', 'UnconfirmedUser']),
};

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

const ErrorCard = withRouter(ErrorCardComp);

const ErrorPageComp = (props) => {
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
      Opnieuw proberen
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

ErrorPageComp.propTypes = propTypes;

export const ErrorPage = ErrorPageComp;

const ErrorNavbar = (props) => {
  if (rdf.equals(props.subject, NS.app('n?type=infinite'))) {
    return null;
  }

  return (
    <ErrorButtonHeader {...props} />
  );
};

ErrorNavbar.propTypes = {
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  reloadLinkedObject: PropTypes.func.isRequired,
  subject: subjectType,
};

export default [
  LinkedRenderStore.registerRenderer(
    ErrorPage,
    NS.ll('ErrorResource'),
    RENDER_CLASS_NAME,
    pageTopology
  ),
  LinkedRenderStore.registerRenderer(
    props => (
      <Container>
        <ErrorCard {...props} />
      </Container>
    ),
    NS.ll('ErrorResource'),
    RENDER_CLASS_NAME,
    [
      primaryResourceTopology,
      tabPaneTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ErrorCard,
    NS.ll('ErrorResource'),
    RENDER_CLASS_NAME,
    [
      alertDialogTopology,
      containerTopology,
      menuTopology,
      cardListTopology,
      gridTopology,
      widgetTopologyTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ErrorNavbar,
    NS.ll('ErrorResource'),
    RENDER_CLASS_NAME,
    navbarTopology
  ),
  LinkedRenderStore.registerRenderer(
    ErrorButtonInline,
    NS.ll('ErrorResource'),
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
      omniformFieldsTopology,
      parentTopology,
      voteBubbleTopology,
      voteEventResultTopology,
    ]
  ),
];
