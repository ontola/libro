import { makeStyles } from '@mui/styles';
import rdf, { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
  useLRS,
} from 'link-redux';
import { TopologyContextType } from 'link-redux/dist-types/types';
import React, { ReactChild } from 'react';
import { Redirect } from 'react-router';

import AccountHelpersCardAppendix from '../../../components/SignInForm/AccountHelpersCardAppendix';
import { isDifferentWebsite, retrievePath } from '../../../helpers/iris';
import { serializeForStorage } from '../../../helpers/persistence';
import { useCurrentActor } from '../../../hooks/useCurrentActor';
import { website } from '../../../ontology/app';
import ontola from '../../../ontology/ontola';
import { actionsBarTopology, allTopologiesExcept } from '../../../topologies';

interface CreateSessionProps {
  reason: ReactChild;
  topologyCtx: TopologyContextType;
}

const useStyles = makeStyles({
  reasonPadding: {
    padding: '1rem 0',
  },
});

const CreateSession: FC<CreateSessionProps> = ({
  reason,
  subject,
  topologyCtx,
}) => {
  const lrs = useLRS();
  const classes = useStyles();
  const [currentSubject, setSubject] = React.useState(subject);
  const [email, setEmail] = React.useState<null | string>(null);
  const getRedirectLocation = () => new URL(subject.value).searchParams.get('redirect_url') || website;
  const redirectLocation = getRedirectLocation();
  const redirectURL = React.useMemo(() => (
    redirectLocation ? serializeForStorage([rdf.literal(redirectLocation)]) : null
  ), [redirectLocation]);
  const { actorType } = useCurrentActor();
  const fieldName = React.useCallback((key) => (key.split('.').slice(-1).pop()), []);
  const emailFieldName = btoa(schema.email.value);
  const redirectURLFieldName = btoa(ontola.redirectUrl.value);
  const sessionStore = React.useMemo<Partial<Storage>>(() => ({
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
  const onCancelHandler = React.useCallback(
    () => setSubject(subject),
    [setSubject, subject],
  );
  const onDoneHandler = React.useCallback((location: NamedNode) => {
    if (isDifferentWebsite(location)) {
      lrs.actions.ontola.hideDialog();
      lrs.actions.ontola.navigate(location, true);
    } else {
      setSubject(location);
    }
  }, [lrs, setSubject]);

  if (redirectLocation && actorType && ['ConfirmedUser', 'UnconfirmedUser'].includes(actorType?.value)) {
    return <Redirect to={retrievePath(redirectLocation)!} />;
  }

  const ActionComponent = lrs.getComponentForType(schema.Action, topologyCtx);

  const appendix = () => (
    <AccountHelpersCardAppendix
      currentSubject={currentSubject}
      onClick={(e) => {
        e.preventDefault();
        setSubject(rdf.namedNode((e.target as HTMLAnchorElement).href));
      }}
    />
  );

  if (!ActionComponent) {
    return null;
  }

  return (
    <Resource subject={currentSubject}>
      {reason && (
        <div className={classes.reasonPadding}>
          {reason}
        </div>
      )}
      <ActionComponent
        appendix={appendix}
        key={currentSubject.value}
        sessionStore={sessionStore}
        onCancel={currentSubject === subject ? null : onCancelHandler}
        onDone={onDoneHandler}
      />
    </Resource>
  );
};

CreateSession.type = ontola.ns('Create::Auth::Session');

CreateSession.topology = allTopologiesExcept(actionsBarTopology);

export default register(CreateSession);
