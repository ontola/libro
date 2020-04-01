import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  linkType,
  register,
  useDataInvalidation,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { SignInFormContainerCardRow } from '../../../containers/SignInFormContainer';
import { currentURL } from '../../../helpers/iris';
import { useCurrentActor } from '../../../hooks/useCurrentActor';
import argu from '../../../ontology/argu';
import { allTopologies } from '../../../topologies';

const SignInFlow = ({
  currentVote,
}) => {
  const { actorType } = useCurrentActor();
  const showSignInFlow = ['GuestUser', 'UnconfirmedUser'].includes(actorType?.value);
  useDataInvalidation(currentVote);
  const [currentOption] = useResourceProperty(currentVote, schema.option);

  if (!showSignInFlow || !currentOption || rdf.equals(currentOption, argu.abstain)) {
    return null;
  }

  return (
    <SignInFormContainerCardRow
      r={currentURL()}
      reason={(
        <FormattedMessage
          defaultMessage="Confirm your vote via e-mail:"
          id="https://app.argu.co/i18n/voteFlow/confirmMessage"
        />
      )}
    />
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
