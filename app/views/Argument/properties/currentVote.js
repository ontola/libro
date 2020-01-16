import { register } from 'link-redux';

import argu from '../../../ontology/argu';
import { allTopologies } from '../../../topologies';
import { getVoteButtons } from '../../VoteEvent/properties/currentVote';

const ArgumentCurrentVote = getVoteButtons([argu.yes]);

ArgumentCurrentVote.type = [
  argu.ConArgument,
  argu.ProArgument,
];

ArgumentCurrentVote.property = argu.currentVote;

ArgumentCurrentVote.topology = allTopologies;

ArgumentCurrentVote.mapDataToProps = {
  currentVote: argu.currentVote,
  votes: argu.votes,
};

export default register(ArgumentCurrentVote);
