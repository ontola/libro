import LinkedRenderStore from 'link-lib';
import { link, LinkedResourceContainer, PropertyBase, TopologyProvider } from 'link-redux';
import React from 'react';

import { retrievePath } from '../../../helpers/iris';
import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';

class CurrentVote extends PropertyBase {
  shouldComponentUpdate(nextProps) {
    return this.props.subject !== nextProps.subject ||
      this.props.version !== nextProps.version ||
      this.props.currentVote !== nextProps.currentVote;
  }

  getEntryPoint() {
    const base = new URL(this.props.base);
    const type = base.searchParams.get('type');
    base.searchParams.delete('type');
    base.searchParams.delete('page');
    base.searchParams.set('filter[option]', this.props.side.term);
    base.searchParams.set('page', '1');
    base.searchParams.set('type', type);
    return this.context.linkedRenderStore.getResourceProperty(
      NS.app(`${retrievePath(base.toString()).slice(1)}`),
      NS.argu('createAction')
    );
  }

  render() {
    const entrypoint = this.getEntryPoint();

    if (!entrypoint) {
      return null;
    }

    let option;
    if (this.props.currentVote) {
      option = this
        .context
        .linkedRenderStore
        .getResourceProperty(this.props.currentVote, NS.schema('option'));
    }

    return (
      <LinkedResourceContainer
        current={option !== undefined && option === this.props.side}
        currentVote={this.props.currentVote}
        subject={entrypoint}
        variant={this.props.side.term}
      />
    );
  }
}

export const getVoteButtons = (options) => {
  class VoteButtons extends TopologyProvider {
    constructor() {
      super();

      this.topology = NS.argu('cardVoteEvent');
    }

    render() {
      const voteButtons = options.map(side => (
        <CurrentVote
          base={this.props.votes.value}
          currentVote={this.props.currentVote}
          key={side}
          side={side}
        />
      ));

      return (
        <div itemScope style={{ display: 'flex' }}>
          {voteButtons}
        </div>
      );
    }
  }

  return VoteButtons;
};

export default LinkedRenderStore.registerRenderer(
  link([
    NS.argu('currentVote'),
    NS.argu('votes'),
  ])(getVoteButtons([NS.argu('yes'), NS.argu('other'), NS.argu('no')])),
  NS.argu('VoteEvent'),
  NS.argu('currentVote'),
  allTopologies
);
