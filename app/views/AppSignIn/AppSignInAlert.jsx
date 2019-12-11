import { register, subjectType } from 'link-redux';
import React from 'react';

import SignInFormContainer from '../../containers/SignInFormContainer';
import app from '../../ontology/app';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';

const rFromIri = (iri) => (
  new URL(iri).searchParams.get('r')
);

const AppSignInAlert = ({ subject }) => (
  <Container>
    <SignInFormContainer r={rFromIri(subject.value)} />
  </Container>
);

AppSignInAlert.type = app.AppSignIn;

AppSignInAlert.topology = alertDialogTopology;

AppSignInAlert.propTypes = {
  subject: subjectType,
};

export default register(AppSignInAlert);
