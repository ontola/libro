import HttpStatus from 'http-status-codes';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import {
  Card,
  CardContent,
  Container,
  Heading,
  LinkDuo,
} from '../../components';
import SignInFormContainer from '../../containers/SignInFormContainer';
import { NS } from '../../helpers/LinkedRenderStore';
import { currentLocation } from '../../helpers/paths';

import ErrorButtonWithFeedback from './ErrorButtonWithFeedback';
import ErrorButtonInline from './ErrorButtonInline';
import { bodyForStatus, errors, headerForStatus } from './ErrorMessages';
import ErrorButtonSideBar from './ErrorButtonSideBar';

const propTypes = {
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  reloadLinkedObject: PropTypes.func,
};

const ErrorCardComp = (props) => {
  const { linkRequestStatus, location } = props;

  let mainAction = (
    <ErrorButtonWithFeedback theme="box" {...props}>
      Opnieuw proberen
    </ErrorButtonWithFeedback>
  );

  if (linkRequestStatus.status === HttpStatus.FORBIDDEN) {
    mainAction = (
      <Container size="small">
        <SignInFormContainer redirect={currentLocation(location).value} />
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
        {mainAction}
      </CardContent>
    </Card>
  );
};

ErrorCardComp.propTypes = propTypes;

const ErrorCard = withRouter(ErrorCardComp);

const ErrorPageComp = (props) => {
  const { linkRequestStatus, location } = props;

  let cardAction = (
    <ErrorButtonWithFeedback theme="box" {...props}>
      Opnieuw proberen
    </ErrorButtonWithFeedback>
  );

  if (linkRequestStatus.status === HttpStatus.FORBIDDEN) {
    cardAction = (
      <SignInFormContainer redirect={currentLocation(location).value} />
    );
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Heading size="1" variant="alert">
            <FontAwesome name="exclamation-triangle" />
            {' '}
            {headerForStatus(linkRequestStatus)}
          </Heading>
          {bodyForStatus(linkRequestStatus)}
          <p>
            {`${errors.nl.mistaken} `}
            <LinkDuo
              style={{ textDecoration: 'underline' }}
              to="https://argu.freshdesk.com/support/tickets/new"
            >
              {errors.nl.let_us_know}
            </LinkDuo>
          </p>
          {cardAction}
        </CardContent>
      </Card>
    </Container>
  );
};

ErrorPageComp.propTypes = propTypes;

const ErrorPage = withRouter(ErrorPageComp);

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
  reloadLinkedObject: PropTypes.func,
  subject: subjectType,
};

export default [
  LinkedRenderStore.registerRenderer(
    ErrorPage,
    NS.ll('ErrorResource')
  ),
  LinkedRenderStore.registerRenderer(
    ErrorCard,
    NS.ll('ErrorResource'),
    RENDER_CLASS_NAME,
    [
      NS.argu('card'),
      NS.argu('cardFixed'),
      NS.argu('cardHover'),
      NS.argu('cardMain'),
      NS.argu('cardRow'),
      NS.argu('collection'),
      NS.argu('container'),
      NS.argu('dropdownContent'),
      NS.argu('section'),
      NS.argu('grid'),
      NS.argu('widget'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ErrorSidebar,
    NS.ll('ErrorResource'),
    RENDER_CLASS_NAME,
    [
      NS.argu('sidebar'),
      NS.argu('sidebarBlock'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ErrorButtonInline,
    NS.ll('ErrorResource'),
    RENDER_CLASS_NAME,
    [
      NS.argu('detail'),
      NS.argu('inline'),
      NS.argu('voteBubble'),
    ]
  ),
];
