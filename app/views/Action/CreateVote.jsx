import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import {
  LinkedResourceContainer,
  linkType,
  lrsType,
  register,
  subjectType,
  useDataFetching,
  useDataInvalidation,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { connect } from 'react-redux';

import { omniformOpenInline, omniformSetAction } from '../../state/omniform';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';
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
  disabledMessage: {
    defaultMessage: 'Voting not possible',
    id: 'https://app.argu.co/i18n/votes/expireable/states/disabled/message',
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
      [NS.ontola('Create::Opinion'), NS.argu('Update::Opinion')]
    );

    if (!hasOpinionAction) {
      return undefined;
    }

    const createOpinion = ownProps.lrs.getResourceProperty(inlineFormTarget, NS.argu('create_opinion'));
    const updateOpinion = ownProps.lrs.getResourceProperty(inlineFormTarget, NS.argu('update_opinion'));

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

function currentVote(current, object, subject, lrs) {
  if (current !== undefined) {
    return current;
  }

  const vote = lrs.getResourceProperty(object, NS.argu('currentVote'));
  const lastUpdate = useDataInvalidation({
    dataSubjects: [vote],
    subject,
  });
  useDataFetching({ subject: vote }, lastUpdate);

  if (!vote) {
    return false;
  }

  const currentOption = lrs.getResourceProperty(vote, schema.option);

  return currentOption && currentOption !== NS.argu('abstain');
}

function getVariant(current, variant, object, lrs) {
  if (current !== undefined) {
    return variant;
  }

  const parentType = lrs.getResourceProperty(object, rdfx.type);

  return rdf.equals(parentType, NS.argu('ProArgument')) ? 'yes' : 'no';
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
  lrs,
  object,
  openOmniform,
  subject,
  target,
  variant,
}) => {
  const { formatMessage } = useIntl();
  const handleClick = () => lrs
    .exec(subject)
    .then(openOmniform)
    .catch((e) => {
      handle(e);
    });

  const isCurrentOrVote = currentVote(current, object, subject, lrs);

  if (!target) {
    return null;
  }

  const disabled = rdf.equals(actionStatus, NS.ontola('DisabledActionStatus'));
  const expired = rdf.equals(actionStatus, NS.ontola('ExpiredActionStatus'));

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
  } else if (disabled) {
    title = formatMessage(messages.disabledMessage);
  }

  return (
    <LinkedResourceContainer
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
  NS.ontola('Create::Vote'),
  NS.ontola('CreateVoteAction'),
  NS.ontola('DestroyVoteAction'),
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
  lrs: lrsType,
  object: linkType,
  openOmniform: PropTypes.func,
  subject: subjectType,
  target: linkType,
  variant: PropTypes.string,
};

export default register(CreateVote);
