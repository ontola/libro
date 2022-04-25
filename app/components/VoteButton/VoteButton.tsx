import rdf, { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  Resource,
  useDataFetching,
  useIds,
  useLRS,
  useStrings,
} from 'link-redux';
import React from 'react';

import { entityIsLoaded } from '../../helpers/data';
import {
  HTTP_RETRY_WITH,
  SubmitDataProcessor,
  handleHTTPRetry,
} from '../../helpers/errorHandling';
import { fontAwesomeIRI } from '../../helpers/iris';
import { handle } from '../../helpers/logging';
import { countInParentheses } from '../../helpers/numbers';
import useCounts from '../../hooks/votes/useCounts';
import useVoteAction from '../../hooks/votes/useVoteAction';
import { ButtonVariant } from '../Button';

interface VoteButtonProps {
  createAction: SomeNode;
  currentOption: SomeNode;
  currentVote: SomeNode;
  grow: boolean;
  option: SomeNode;
}

/*
 * Renders a vote button
 */
const VoteButton = ({
  createAction,
  currentOption,
  currentVote,
  grow,
  option,
}: VoteButtonProps): JSX.Element | null => {
  useDataFetching(option);
  const lrs = useLRS<unknown, SubmitDataProcessor>();
  const [count] = useCounts([option]);
  const active = rdf.equals(currentOption, option);
  const {
    action,
    expired,
    target,
    tooltip,
  } = useVoteAction(createAction, active, currentVote);
  const [color] = useStrings(option, schema.color);
  const [image] = useIds(option, schema.image);
  const [name] = useStrings(option, schema.name);
  const handleClick: () => Promise<any> = React.useCallback(() => {
    if (!isNamedNode(action)) {
      return Promise.resolve();
    }

    const dataObject = {
      [schema.option.value]: option,
    };

    return (
      lrs
        .exec(action, dataObject)
        .catch((e) => {
          if (e.response.status === HTTP_RETRY_WITH) {
            return handleHTTPRetry(lrs, e, () => handleClick());
          }

          return handle(e);
        })
    );
  }, [lrs, action, option]);

  if (!entityIsLoaded(lrs, action)) {
    return <Resource subject={action} />;
  }

  if (!entityIsLoaded(lrs, option)) {
    return <Resource subject={option} />;
  }

  if (!target) {
    return null;
  }

  return (
    <Resource
      active={active}
      color={color}
      disabled={expired}
      grow={grow}
      image={image ?? fontAwesomeIRI('circle-o')}
      name={name ? `${name} ${countInParentheses(count)}` : null}
      stretch={grow}
      subject={target}
      title={tooltip ?? name}
      variant={ButtonVariant.Toggle}
      onClick={handleClick}
    />
  );
};

export default VoteButton;
