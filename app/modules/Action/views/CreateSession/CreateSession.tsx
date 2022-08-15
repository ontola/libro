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
import { useNavigate } from 'react-router';

import { allTopologiesExcept } from '../../../../topologies';
import AccountHelpersCardAppendix from '../../../Auth/components/SignInForm/AccountHelpersCardAppendix';
import { useCurrentActor } from '../../../Auth/hooks/useCurrentActor';
import { isDifferentWebsite, retrievePath } from '../../../Common/lib/iris';
import { HideDialog, Navigate } from '../../../Common/middleware/actions';
import { website } from '../../../Kernel/lib/frontendIRIComponents';
import ontola from '../../../Kernel/ontology/ontola';
import useMemoryStore from '../../hooks/useMemoryStore';
import { actionsBarTopology } from '../../topologies';

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
  const { actorType } = useCurrentActor();

  const navigate = useNavigate();

  const [currentSubject, setSubject] = React.useState(subject);

  const redirectLocation = new URL(subject.value).searchParams.get('redirect_url') || website;
  const sessionStore = useMemoryStore({
    [ontola.redirectUrl.value]: redirectLocation ? [rdf.literal(redirectLocation)] : [],
  });

  const onCancelHandler = React.useCallback(
    () => currentSubject === subject ? navigate(-1) : setSubject(subject),
    [setSubject, subject, currentSubject],
  );
  const onDoneHandler = React.useCallback((location: NamedNode) => {
    if (isDifferentWebsite(location)) {
      lrs.actions.get(HideDialog)();
      lrs.actions.get(Navigate)(location, true);
    } else {
      setSubject(location);
    }
  }, [lrs, setSubject]);
  const appendix = React.useCallback(() => (
    <AccountHelpersCardAppendix
      currentSubject={currentSubject}
      onClick={(e) => {
        e.preventDefault();
        setSubject(rdf.namedNode((e.target as HTMLAnchorElement).href));
      }}
    />
  ), [currentSubject]);

  const redirectUser = redirectLocation && actorType && ['ConfirmedUser', 'UnconfirmedUser'].includes(actorType?.value);

  React.useEffect(() => {
    if (redirectUser) {
      navigate(retrievePath(redirectLocation)!, { replace: true });
    }
  }, [redirectUser]);

  if (redirectUser) {
    return null;
  }

  const ActionComponent = lrs.getComponentForType(schema.Action, topologyCtx);

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
