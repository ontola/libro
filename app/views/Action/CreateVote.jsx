import {
  linkType,
  LinkedResourceContainer,
  subjectType,
  register,
  useDataFetching,
  useLinkContext,
  lrsType,
  useDataInvalidation,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { omniformOpenInline, omniformSetAction } from '../../state/omniform';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';
import { allTopologies } from '../../topologies';
import { CollectionTypes } from '../Collection/types';

const mapDispatchToProps = (dispatch, ownProps) => ({
  openOmniform: () => {
    const isVoteEventVote = ownProps.lrs.findSubject(
      ownProps.subject,
      [NS.schema('object'), NS.rdf('type')],
      CollectionTypes
    );
    const inlineFormTarget = isVoteEventVote.length > 0
      ? ownProps.lrs.getResourceProperty(ownProps.subjectCtx, NS.schema('isPartOf'))
      : ownProps.subjectCtx;
    const hasOpinionAction = ownProps.lrs.findSubject(
      inlineFormTarget,
      [NS.schema('potentialAction'), NS.rdf('type')],
      [NS.argu('Create::Opinion'), NS.argu('Update::Opinion')]
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

function currentVote(current, object, lrs) {
  if (current !== undefined) {
    return current;
  }

  return lrs.getResourceProperty(object, NS.argu('currentVote')) || false;
}

function getVariant(current, variant, object, lrs) {
  if (current !== undefined) {
    return variant;
  }

  const parentType = lrs.getResourceProperty(object, NS.rdf('type'));

  return parentType === NS.argu('ProArgument') ? 'yes' : 'no';
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
  const handleClick = () => lrs
    .exec(subject)
    .then(openOmniform)
    .catch((e) => {
      handle(e);
    });

  if (!target) {
    return null;
  }

  const disabled = actionStatus === NS.argu('DisabledActionStatus');
  const expired = actionStatus === NS.argu('ExpiredActionStatus');
  let title;
  if (expired) {
    title = (
      <FormattedMessage
        defaultMessage="Voting no longer possible"
        id="https://app.argu.co/i18n/votes/expireable/states/closed/message"
      />
    );
  } else if (disabled) {
    title = (
      <FormattedMessage
        defaultMessage="Voting not possible"
        id="https://app.argu.co/i18n/votes/expireable/states/disabled/message"
      />
    );
  }

  const isCurrentOrVote = currentVote(current, object, lrs);
  const vote = typeof isCurrentOrVote === 'object' ? isCurrentOrVote : undefined;
  const context = useLinkContext();
  useDataInvalidation({ dataSubjects: [vote].filter(Boolean), subject }, context);
  useDataFetching({ subject: vote }, context);

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
  NS.argu('Create::Vote'),
  NS.argu('CreateVoteAction'),
  NS.argu('DestroyVoteAction'),
];

CreateVote.topology = allTopologies;

CreateVote.hocs = [connect(null, mapDispatchToProps)];

CreateVote.mapDataToProps = {
  actionStatus: NS.schema('actionStatus'),
  isPartOf: NS.schema('isPartOf'),
  object: NS.schema('object'),
  target: NS.schema('target'),
  type: { label: NS.rdf('type'), limit: Infinity },
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
