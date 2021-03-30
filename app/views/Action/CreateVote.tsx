import rdf, { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  LinkReduxLRSType,
  Resource,
  register,
  useDataFetching,
  useLRS,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import {
  MessageDescriptor,
  useIntl,
} from 'react-intl';
import { connect } from 'react-redux';
import { Action } from 'redux';

import { entityIsLoaded } from '../../helpers/data';
import {
  HTTP_RETRY_WITH,
  LRS,
  SubmitDataProcessor,
  handleHTTPRetry,
} from '../../helpers/errorHandling';
import { handle } from '../../helpers/logging';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { omniformOpenInline, omniformSetAction } from '../../state/omniform';
import { allTopologies } from '../../topologies';
import { voteMessages } from '../../translations/messages';
import { CollectionTypes } from '../Collection/types';

interface CreateVoteProps {
  lrs: LinkReduxLRSType;
  openOmniform: () => undefined | Promise<any>,
  subject: NamedNode;
  subjectCtx: NamedNode;
}

enum Option {
  Yes = 'yes',
  No = 'no',
  Other = 'other',
}

const mapDispatchToProps = (dispatch: (action: Action) => void, ownProps: CreateVoteProps) => ({
  openOmniform: () => {
    const isVoteEventVote = ownProps.lrs.findSubject(
      ownProps.subject,
      [schema.object, rdfx.type],
      CollectionTypes,
    );
    const inlineFormTarget = isVoteEventVote.length > 0
      ? ownProps.lrs.getResourceProperty(ownProps.subjectCtx, schema.isPartOf) as NamedNode
      : ownProps.subjectCtx;
    const hasOpinionAction = ownProps.lrs.findSubject(
      inlineFormTarget,
      [schema.potentialAction, rdfx.type],
      [ontola['Create::Opinion'], argu['Update::Opinion']],
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
        parentIRI: inlineFormTarget ? btoa(inlineFormTarget.value) : null,
      })),
      dispatch(omniformSetAction({
        action: updateOpinion,
        parentIRI: inlineFormTarget ? btoa(inlineFormTarget.value) : null,
      })),
    ]);
  },
});

function countAttribute(option: string) {
  if (option === 'yes') {
    return argu.votesProCount;
  } else if (option === 'no') {
    return argu.votesConCount;
  }

  return argu.votesNeutralCount;
}

function useCurrentVote(parent: SomeNode) {
  const [vote] = useResourceProperty(parent, argu.currentVote) as NamedNode[];
  useDataFetching([parent, vote]);
  const [currentOption] = useResourceProperty(vote, schema.option) as SomeNode[];

  return [vote, currentOption];
}

function getTitle(variant: string, parentType: SomeNode, expired: boolean, fm: (message: MessageDescriptor) => string) {
  if (expired) {
    return fm(voteMessages.closedMessage);
  }

  if (rdf.equals(parentType, argu.ProArgument) || rdf.equals(parentType, argu.ConArgument)) {
    return null;
  }

  if (variant === 'yes') {
    return fm(voteMessages.proMessage);
  } else if (variant === 'no') {
    return fm(voteMessages.conMessage);
  } else if (variant === 'other') {
    return fm(voteMessages.neutralMessage);
  }

  return null;
}

const isOption = (v: string): v is Option => ['yes', 'no', 'other'].includes(v);

function getOption(subject: SomeNode): Option {
  const variant = new URL(subject.value).searchParams.get('filter[]')?.split('=')?.pop();

  if (variant && isOption(variant)) {
    return variant;
  }

  return Option.Yes;
}

function getVariant(option: string, parentType: SomeNode) {
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
const CreateVote: FC<CreateVoteProps> = ({
  openOmniform,
  subject,
}) => {
  const lrs = useLRS<unknown, SubmitDataProcessor>();
  const { formatMessage } = useIntl();
  const [isPartOf] = useProperty(schema.isPartOf) as SomeNode[];
  const [currentVote, currentOption] = useCurrentVote(isPartOf);
  const [deleteVoteAction] = useResourceProperty(currentVote, ontola.trashAction) as NamedNode[];
  const option = getOption(subject);
  const active = rdf.equals(currentOption, argu[option]);
  const action = active && entityIsLoaded<LRS>(lrs, deleteVoteAction)
    ? deleteVoteAction
    : subject;
  useDataFetching(deleteVoteAction);
  const [actionStatus] = useResourceProperty(action, schema.actionStatus);
  const [target] = useResourceProperty(action, schema.target) as SomeNode[];
  const [parentType] = useResourceProperty(isPartOf, rdfx.type) as SomeNode[];
  const [count] = useResourceProperty(isPartOf, countAttribute(option));
  const handleClick: () => Promise<any> = React.useCallback(() => (
    lrs
      .exec(action)
      .then(openOmniform)
      .catch((e) => {
        if (e.response.status === HTTP_RETRY_WITH) {
          return handleHTTPRetry(lrs, e, () => handleClick());
        }

        return handle(e);
      })
  ), [lrs, action, openOmniform]);

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
      active={active}
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
  isPartOf: schema.isPartOf,
};

export default register(CreateVote);
