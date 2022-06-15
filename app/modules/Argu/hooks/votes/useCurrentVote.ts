import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  useDataFetching,
  useGlobalIds,
  useIds,
} from 'link-redux';

import argu from '../../ontology/argu';

type UseCurrentVote = [vote: NamedNode, option: SomeNode];

const useCurrentVote = (): UseCurrentVote => {
  const [vote] = useGlobalIds(argu.currentVote);
  useDataFetching([vote]);
  const [currentOption] = useIds(vote, schema.option);

  return [vote, currentOption];
};

export default useCurrentVote;
