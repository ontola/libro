import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  Resource,
  register,
  subjectType,
  topologyType,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router';

import CardContent from '../../components/Card/CardContent';
import AccountHelpersCardAppendix from '../../components/SignInForm/AccountHelpersCardAppendix';
import { retrievePath } from '../../helpers/iris';
import { serializeForStorage } from '../../helpers/persistence';
import { useCurrentActor } from '../../hooks/useCurrentActor';
import { website } from '../../ontology/app';
import ontola from '../../ontology/ontola';
import { allTopologiesExcept } from '../../topologies';
import { actionsBarTopology } from '../../topologies/ActionsBar';

const CreateSession = ({
  reason,
  subject,
  topologyCtx,
}) => {
  const lrs = useLRS();
  const [currentSubject, setSubject] = React.useState(subject);
  const [email, setEmail] = React.useState(null);
  const getRedirectLocation = () => new URL(subject.value).searchParams.get('r') || website;
  const redirectURL = React.useMemo(() => (
    getRedirectLocation() ? serializeForStorage([rdf.literal(getRedirectLocation())]) : null
  ), []);
  const { actorType } = useCurrentActor();
  const fieldName = React.useCallback((key) => (key.split('.').slice(-1).pop()), []);
  const emailFieldName = btoa(schema.email.value);
  const redirectURLFieldName = btoa(ontola.redirectUrl.value);
  const sessionStore = React.useMemo(() => ({
    getItem: (key) => {
      switch (fieldName(key)) {
        case emailFieldName:
          return email;
        case redirectURLFieldName:
          return redirectURL;
        default:
          return null;
      }
    },
    setItem: (key, value) => {
      if (fieldName(key) === emailFieldName) {
        setEmail(value);
      }
    },
  }), [email]);

  if (['ConfirmedUser', 'UnconfirmedUser'].includes(actorType?.value)) {
    return <Redirect to={retrievePath(getRedirectLocation())} />;
  }

  const ActionComponent = lrs.getComponentForType(schema.CreateAction, topologyCtx);
  const appendix = () => (
    <AccountHelpersCardAppendix
      currentSubject={currentSubject}
      onClick={(e) => {
        e.preventDefault();
        setSubject(rdf.namedNode(e.target.href));
      }}
    />
  );

  return (
    <Resource subject={currentSubject}>
      {reason && <CardContent endSpacing>{reason}</CardContent>}
      <ActionComponent
        appendix={appendix}
        key={currentSubject.value}
        sessionStore={sessionStore}
        onCancel={currentSubject === subject ? null : () => {
          setSubject(subject);
        }}
        onDone={setSubject}
      />
    </Resource>
  );
};

CreateSession.type = ontola.ns('Create::Session');

CreateSession.topology = allTopologiesExcept(actionsBarTopology);

CreateSession.propTypes = {
  reason: PropTypes.func,
  subject: subjectType,
  topologyCtx: topologyType,
};

export default register(CreateSession);
