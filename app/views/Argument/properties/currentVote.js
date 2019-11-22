import { register } from 'link-redux';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { getVoteButtons } from '../../VoteEvent/properties/currentVote';

const ArgumentCurrentVote = getVoteButtons([NS.argu('yes')]);

ArgumentCurrentVote.type = [
  NS.argu('ConArgument'),
  NS.argu('ProArgument'),
];

ArgumentCurrentVote.property = NS.argu('currentVote');

ArgumentCurrentVote.topology = allTopologies;

ArgumentCurrentVote.mapDataToProps = {
  currentVote: NS.argu('currentVote'),
  votes: NS.argu('votes'),
};

export default register(ArgumentCurrentVote);
