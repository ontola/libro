import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  Resource,
  ReturnType,
  linkType,
  register,
  subjectType,
  useDataFetching,
  useDataInvalidation,
  useLRS,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { connect } from 'react-redux';

import { HTTP_RETRY_WITH, handleHTTPRetry } from '../../helpers/errorHandling';
import { handle } from '../../helpers/logging';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { omniformOpenInline, omniformSetAction } from '../../state/omniform';
import { allTopologies } from '../../topologies';
import { CollectionTypes } from '../Collection/types';

const messages = defineMessages({
  closedMessage: {
    defaultMessage: 'Voting no longer possible',
    id: 'https://app.argu.co/i18n/votes/expireable/states/closed/message',
  },
  conMessage: {
    defaultMessage: 'Click to vote against this idea',
    id: 'https://app.argu.co/i18n/votes/con/message',
  },
  neutralMessage: {
    defaultMessage: 'Click to vote neutral on this idea',
    id: 'https://app.argu.co/i18n/votes/neutral/message',
  },
  proMessage: {
    defaultMessage: 'Click to vote for this idea',
    id: 'https://app.argu.co/i18n/votes/pro/message',
  },
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  openOmniform: () => {
    const isVoteEventVote = ownProps.lrs.findSubject(
      ownProps.subject,
      [schema.object, rdfx.type],
      CollectionTypes
    );
    const inlineFormTarget = isVoteEventVote.length > 0
      ? ownProps.lrs.getResourceProperty(ownProps.subjectCtx, schema.isPartOf)
      : ownProps.subjectCtx;
    const hasOpinionAction = ownProps.lrs.findSubject(
      inlineFormTarget,
      [schema.potentialAction, rdfx.type],
      [ontola['Create::Opinion'], argu['Update::Opinion']]
    );

    if (!hasOpinionAction) {
      return undefined;
    }

    const createOpinion = ownProps.lrs.getResourceProperty(inlineFormTarget, argu.create_opinion);
    const updateOpinion = ownProps.lrs.getResourceProperty(inlineFormTarget, argu.update_opinion);

    return Promise.all([
      dispatch(omniformOpenInline(inlineFormTarget)),
      dispatch(omniformSetAction({
        action: createOpinion,
        parentIRI: btoa(inlineFormTarget),
      })),
      dispatch(omniformSetAction({
        action: updateOpinion,
        parentIRI: btoa(inlineFormTarget),
      })),
    ]);
  },
});

function countAttribute(option) {
  if (option === 'yes') {
    return argu.votesProCount;
  } else if (option === 'no') {
    return argu.votesConCount;
  }

  return argu.votesNeutralCount;
}

function useCurrentOption(parent, subject) {
  const [vote] = useResourceProperty(parent, argu.currentVote);
  useDataInvalidation(subject);
  useDataFetching([parent, vote]);
  const [currentOption] = useResourceProperty(vote, schema.option);

  return currentOption;
}

function getTitle(variant, parentType, expired, fm) {
  if (expired) {
    return fm(messages.closedMessage);
  }

  if (rdf.equals(parentType, argu.ProArgument) || rdf.equals(parentType, argu.ConArgument)) {
    return null;
  }

  if (variant === 'yes') {
    return fm(messages.proMessage);
  } else if (variant === 'no') {
    return fm(messages.conMessage);
  } else if (variant === 'other') {
    return fm(messages.neutralMessage);
  }

  return null;
}

function getOption(subject) {
  const variant = new URL(subject.value).searchParams.get('filter[]')?.split('=')?.pop();

  if (variant) {
    return variant;
  }

  return 'yes';
}

function getVariant(option, parentType) {
  if (rdf.equals(parentType, argu.ProArgument)) {
    return 'yes';
  }

  if (rdf.equals(parentType, argu.ConArgument)) {
    return 'no';
  }

  return option;
}

/*
 * Renders the vote actions
 *
 * Currently includes alternative behaviour to override the color and state for argument votes since
 * those aren't based on the vote but rather on the argument (see {propTypes}).
 */
const CreateVote = ({
  actionStatus,
  openOmniform,
  subject,
  target,
}) => {
  const lrs = useLRS();
  const { formatMessage } = useIntl();
  const [isPartOf] = useProperty(schema.isPartOf);
  const currentOption = useCurrentOption(isPartOf, subject);
  const [parentType] = useResourceProperty(isPartOf, rdfx.type);
  const option = getOption(subject, parentType);
  const [count] = useResourceProperty(isPartOf, countAttribute(option));
  const handleClick = () => lrs
    .exec(subject)
    .then(openOmniform)
    .catch((e) => {
      if (e.response.status === HTTP_RETRY_WITH) {
        return handleHTTPRetry(lrs, e, () => handleClick());
      }

      return handle(e);
    });

  if (!target) {
    return null;
  }

  const disabled = rdf.equals(actionStatus, ontola.DisabledActionStatus);
  const completed = rdf.equals(actionStatus, schema.CompletedActionStatus);
  const expired = rdf.equals(actionStatus, ontola.ExpiredActionStatus);

  if (disabled || completed) {
    return null;
  }

  return (
    <Resource
      active={rdf.equals(currentOption, argu[option])}
      count={count}
      disabled={disabled || expired}
      grow={rdf.equals(parentType, argu.VoteEvent)}
      stretch={rdf.equals(parentType, argu.VoteEvent)}
      subject={target}
      theme="transparant"
      title={getTitle(option, parentType, expired, formatMessage)}
      variant={getVariant(option, parentType)}
      onClick={handleClick}
    />
  );
};

CreateVote.type = [
  ontola['Create::Vote'],
  ontola.CreateVoteAction,
  ontola.DestroyVoteAction,
];

CreateVote.topology = allTopologies;

CreateVote.hocs = [connect(null, mapDispatchToProps)];

CreateVote.mapDataToProps = {
  actionStatus: schema.actionStatus,
  isPartOf: schema.isPartOf,
  target: schema.target,
  type: {
    label: rdfx.type,
    returnType: ReturnType.AllTerms,
  },
};

CreateVote.propTypes = {
  actionStatus: linkType,
  openOmniform: PropTypes.func,
  subject: subjectType,
  target: linkType,
};

export default register(CreateVote);
