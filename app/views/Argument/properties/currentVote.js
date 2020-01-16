import { register } from 'link-redux';

import argu from '../../../ontology/argu';
import { allTopologies } from '../../../topologies';
import { getVoteButtons } from '../../VoteEvent/properties/currentVote';

const ArgumentCurrentVote = getVoteButtons([argu.ns('yes')]);

ArgumentCurrentVote.type = [
  argu.ns('ConArgument'),
  argu.ns('ProArgument'),
];

ArgumentCurrentVote.property = argu.ns('currentVote');

ArgumentCurrentVote.topology = allTopologies;

ArgumentCurrentVote.mapDataToProps = {
  currentVote: argu.ns('currentVote'),
  votes: argu.ns('votes'),
};

export default register(ArgumentCurrentVote);
