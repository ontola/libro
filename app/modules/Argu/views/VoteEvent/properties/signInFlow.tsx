import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useDataInvalidation,
  useFields,
  useGlobalIds, 
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';

import { allTopologies } from '../../../../../topologies';
import { useCurrentActor } from '../../../../Auth/hooks/useCurrentActor';
import CloseableContainer from '../../../../Common/components/CloseableContainer';
import path, { currentLocationControl } from '../../../../Common/lib/paths';
import { voteMessages } from '../../../lib/messages';
import argu from '../../../ontology/argu';

const useStyles = makeStyles({
  paragraphMargin: {
    marginBottom: '1rem',
    marginTop: '1rem',
  },
});

const SignInFlow = () => {
  const { actorType, primaryEmail } = useCurrentActor();
  const location = useLocation();
  const classes = useStyles();

  const [currentVote] = useGlobalIds(argu.currentVote);
  useDataInvalidation(currentVote);
  const [currentOption] = useFields(currentVote, schema.option);

  const showSignInFlow = ['GuestUser', 'UnconfirmedUser'].includes(actorType?.value ?? '');

  if (!showSignInFlow || !currentOption || rdf.equals(currentOption, argu.abstain)) {
    return null;
  }

  if (actorType?.value === 'UnconfirmedUser') {
    return (
      <CloseableContainer id="ConfirmEmail">
        <p className={classes.paragraphMargin}>
          <FormattedMessage
            {...voteMessages.confirmUnconfirmedUser}
            values={{
              email: (
                <b>
                  {primaryEmail?.value}
                </b>
              ),
            }}
          />
        </p>
      </CloseableContainer>
    );
  }

  const signInDetour = rdf.namedNode(path.signIn(currentLocationControl(location).value));

  return (
    <Resource
      reason={(
        <FormattedMessage {...voteMessages.confirmGuestUser} />
      )}
      subject={signInDetour}
    />
  );
};

SignInFlow.type = [argu.VoteEvent, argu.Poll];

SignInFlow.topology = allTopologies;

SignInFlow.property = argu.signInFlow;

export default register(SignInFlow);
