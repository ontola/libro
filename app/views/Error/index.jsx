import HttpStatus from 'http-status-codes';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import {
  CardContent,
  Heading,
  LinkDuo,
} from '../../components';
import SignInFormContainer from '../../containers/SignInFormContainer';
import { NS } from '../../helpers/LinkedRenderStore';
import { currentLocation } from '../../helpers/paths';
import { getCurrentUserType } from '../../state/app/selectors';
import Card, { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import Container, { containerTopology } from '../../topologies/Container';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { dropdownContentTopology } from '../../topologies/DropdownContent';
import { gridTopology } from '../../topologies/Grid';
import { hoverBoxTopology } from '../../topologies/HoverBox';
import { inlineTopology } from '../../topologies/Inline';
import { pageTopology } from '../../topologies/Page';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { sidebarTopology } from '../../topologies/Sidebar';
import { voteBubbleTopology } from '../../topologies/VoteBubble';
import { voteEventResultTopology } from '../../topologies/VoteEventResult';
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

import ErrorButtonWithFeedback from './ErrorButtonWithFeedback';
import ErrorButtonInline from './ErrorButtonInline';
import { bodyForStatus, errors, headerForStatus } from './ErrorMessages';
import ErrorButtonSideBar from './ErrorButtonSideBar';

const withUserType = Comp => connect(state => ({
  userType: getCurrentUserType(state),
}))(Comp);

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
  const { linkRequestStatus, location, userType } = props;

  let mainAction = (
    <ErrorButtonWithFeedback theme="box" {...props}>
      Opnieuw proberen
    </ErrorButtonWithFeedback>
  );

  if (linkRequestStatus.status === HttpStatus.FORBIDDEN && userType === 'GuestUser') {
    mainAction = (
      <Container size="small">
        <SignInFormContainer r={currentLocation(location).value} />
      </Container>
    );
  }

  return (
    <Card>
      <CardContent>
        <Heading size="2" variant="alert">
          <FontAwesome name="exclamation-triangle" />
          {' '}
          {headerForStatus(linkRequestStatus)}
        </Heading>
        <p>{bodyForStatus(linkRequestStatus)}</p>
      </CardContent>
      {mainAction}
    </Card>
  );
};

ErrorCardComp.propTypes = propTypes;

const ErrorCard = withRouter(withUserType(ErrorCardComp));

const ErrorPageComp = (props) => {
  const {
    caughtError,
    linkRequestStatus,
    location,
    userType,
  } = props;

  let cardAction = (
    <ErrorButtonWithFeedback theme="box" {...props}>
      Opnieuw proberen
    </ErrorButtonWithFeedback>
  );

  if (userType === 'GuestUser'
    && [HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN].includes(linkRequestStatus.status)) {
    cardAction = (
      <SignInFormContainer r={currentLocation(location).value} />
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
            {`${errors.nl.mistaken} `}
            <LinkDuo
              style={{ textDecoration: 'underline' }}
              to="https://argu.freshdesk.com/support/tickets/new"
            >
              {errors.nl.let_us_know}
            </LinkDuo>
          </p>
        </CardContent>
        {cardAction}
      </Card>
    </Container>
  );
};

ErrorPageComp.propTypes = propTypes;

const ErrorPage = withRouter(withUserType(ErrorPageComp));

const ErrorSidebar = (props) => {
  if (props.subject === NS.app('n?type=infinite')) {
    return null;
  }

  return (
    <ErrorButtonSideBar {...props} />
  );
};

ErrorSidebar.propTypes = {
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
    ErrorCard,
    NS.ll('ErrorResource'),
    RENDER_CLASS_NAME,
    [
      containerTopology,
      dropdownContentTopology,
      cardListTopology,
      gridTopology,
      primaryResourceTopology,
      widgetTopologyTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ErrorSidebar,
    NS.ll('ErrorResource'),
    RENDER_CLASS_NAME,
    sidebarTopology
  ),
  LinkedRenderStore.registerRenderer(
    ErrorButtonInline,
    NS.ll('ErrorResource'),
    RENDER_CLASS_NAME,
    [
      cardFixedTopology,
      cardTopology,
      cardMainTopology,
      cardRowTopology,
      detailsBarTopology,
      hoverBoxTopology,
      inlineTopology,
      voteBubbleTopology,
      voteEventResultTopology,
    ]
  ),
];
