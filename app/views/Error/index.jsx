import HttpStatus from 'http-status-codes';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { subjectType, Type } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
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
import { getCurrentUserType } from '../../state/app/selectors';
import Card, { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import Container, { containerTopology } from '../../topologies/Container';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { alertDialogTopology } from '../../topologies/Dialog';
import { dropdownContentTopology } from '../../topologies/DropdownContent';
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

const withUserType = Comp => connect(state => ({
  userType: getCurrentUserType(state),
}))(Comp);

const shouldShowSignIn = (userType, status) => userType === 'GuestUser'
  && [HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN].includes(status);

const propTypes = {
  caughtError: PropTypes.instanceOf(Error),
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
  const { linkRequestStatus, userType } = props;

  let mainAction = (
    <ErrorButtonWithFeedback theme="box" {...props}>
      <FormattedMessage
        defaultMessage="Try again"
        id="https://app.argu.co/i18n/errors/retryButton/label"
      />
    </ErrorButtonWithFeedback>
  );
  if (shouldShowSignIn(userType, linkRequestStatus.status)) {
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
          {headerForStatus(linkRequestStatus)}
        </Heading>
        <p>{bodyForStatus(linkRequestStatus)}</p>
        {mainAction}
      </CardContent>
    </Card>
  );
};

ErrorCardComp.propTypes = propTypes;

const ErrorCard = withRouter(withUserType(ErrorCardComp));

const ErrorPageComp = (props) => {
  const {
    caughtError,
    linkRequestStatus,
    userType,
  } = props;

  let cardAction = (
    <ErrorButtonWithFeedback theme="box" {...props}>
      Opnieuw proberen
    </ErrorButtonWithFeedback>
  );

  if (shouldShowSignIn(userType, linkRequestStatus.status)) {
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
            {headerForStatus(linkRequestStatus) || (caughtError && caughtError.name)}
          </Heading>
          {bodyForStatus(linkRequestStatus)}
          {caughtError && <p>{caughtError.message}</p>}
          {__DEVELOPMENT__ && caughtError && <pre>{caughtError.stack}</pre>}
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

const ErrorPage = withUserType(ErrorPageComp);

const ErrorNavbar = (props) => {
  if (props.subject === NS.app('n?type=infinite')) {
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
    () => (
      <Container>
        <Type />
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
      dropdownContentTopology,
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
      cardFixedTopology,
      cardFloatTopology,
      cardTopology,
      cardMainTopology,
      cardRowTopology,
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
