import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Resource,
  linkType,
  register,
  useDataInvalidation,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardContent from '../../../components/Card/CardContent';
import CloseableContainer from '../../../containers/CloseableContainer';
import path, { currentLocation } from '../../../helpers/paths';
import { useCurrentActor } from '../../../hooks/useCurrentActor';
import argu from '../../../ontology/argu';
import { allTopologies } from '../../../topologies';
import CardRow from '../../../topologies/Card/CardRow';

const SignInFlow = ({
  currentVote,
}) => {
  const { actorType, primaryEmail } = useCurrentActor();
  const showSignInFlow = ['GuestUser', 'UnconfirmedUser'].includes(actorType?.value);
  useDataInvalidation(currentVote);
  const [currentOption] = useResourceProperty(currentVote, schema.option);

  if (!showSignInFlow || !currentOption || rdf.equals(currentOption, argu.abstain)) {
    return null;
  }

  if (actorType?.value === 'UnconfirmedUser') {
    return (
      <CloseableContainer id="ConfirmEmail">
        <CardRow backdrop>
          <CardContent>
            <p>
              <FormattedMessage
                defaultMessage="Please confirm your vote by clicking the link we've sent to {email}"
                id="https://app.argu.co/i18n/forms/session/emailConfirmationReminder"
                values={{
                  email: <b>{primaryEmail.value}</b>,
                }}
              />
            </p>
          </CardContent>
        </CardRow>
      </CloseableContainer>
    );
  }

  return (
    <CardRow>
      <Resource
        reason={(
          <FormattedMessage
            defaultMessage="Confirm your vote via e-mail:"
            id="https://app.argu.co/i18n/voteFlow/confirmMessage"
          />
        )}
        subject={rdf.namedNode(path.signIn(currentLocation(window.location).value))}
      />
    </CardRow>
  );
};

SignInFlow.type = argu.VoteEvent;

SignInFlow.topology = allTopologies;

SignInFlow.property = argu.signInFlow;

SignInFlow.mapDataToProps = {
  currentVote: argu.currentVote,
};

SignInFlow.propTypes = {
  currentVote: linkType,
};

export default register(SignInFlow);
