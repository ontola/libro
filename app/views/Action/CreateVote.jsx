import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import {
  Resource,
  linkType,
  register,
  subjectType,
  useDataFetching,
  useDataInvalidation,
  useLRS,
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

function useCurrentVote(current, object, subject) {
  const [vote] = useResourceProperty(object, argu.currentVote);
  const lastUpdate = useDataInvalidation({
    dataSubjects: [vote],
    subject,
  });
  useDataFetching({ subject: vote }, lastUpdate);
  const [currentOption] = useResourceProperty(vote, schema.option);

  if (current !== undefined) {
    return current;
  }

  if (!vote) {
    return false;
  }

  return currentOption && currentOption !== argu.abstain;
}

function getVariant(current, variant, object, lrs) {
  if (current !== undefined) {
    return variant;
  }

  const parentType = lrs.getResourceProperty(object, rdfx.type);

  return rdf.equals(parentType, argu.ProArgument) ? 'yes' : 'no';
}

/*
 * Renders the vote actions
 *
 * Currently includes alternative behaviour to override the color and state for argument votes since
 * those aren't based on the vote but rather on the argument (see {propTypes}).
 */
const CreateVote = ({
  actionStatus,
  current,
  count,
  object,
  openOmniform,
  subject,
  target,
  variant,
}) => {
  const lrs = useLRS();
  const { formatMessage } = useIntl();
  const isCurrentOrVote = useCurrentVote(current, object, subject);

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
  const expired = rdf.equals(actionStatus, ontola.ExpiredActionStatus);

  if (disabled) {
    return null;
  }

  let title;
  if (variant === 'yes') {
    title = formatMessage(messages.proMessage);
  } else if (variant === 'no') {
    title = formatMessage(messages.conMessage);
  } else if (variant === 'other') {
    title = formatMessage(messages.neutralMessage);
  }

  if (expired) {
    title = formatMessage(messages.closedMessage);
  }

  return (
    <Resource
      active={!!isCurrentOrVote}
      count={count}
      disabled={disabled || expired}
      grow={current !== undefined}
      subject={target}
      theme="transparant"
      title={title}
      variant={getVariant(current, variant, object, lrs)}
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
  object: schema.object,
  target: schema.target,
  type: {
    label: rdfx.type,
    limit: Infinity,
  },
};

CreateVote.propTypes = {
  actionStatus: linkType,
  count: linkType,
  current: PropTypes.bool,
  object: linkType,
  openOmniform: PropTypes.func,
  subject: subjectType,
  target: linkType,
  variant: PropTypes.string,
};

export default register(CreateVote);
