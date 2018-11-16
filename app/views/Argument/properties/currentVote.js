import LinkedRenderStore from 'link-lib';
import { link } from 'link-redux';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { getVoteButtons } from '../../VoteEvent/properties/currentVote';

export default LinkedRenderStore.registerRenderer(
  link([NS.argu('currentVote'), NS.argu('votes')])(getVoteButtons([NS.argu('yes')])),
  [NS.argu('ConArgument'), NS.argu('ProArgument')],
  NS.argu('currentVote'),
  allTopologies
);
