import LinkedRenderStore from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  PropertyBase,
  TopologyProvider,
  withLinkCtx,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { SignInFormContainerCardRow } from '../../../containers/SignInFormContainer';
import { currentURL, retrievePath } from '../../../helpers/iris';
import { NS } from '../../../helpers/LinkedRenderStore';
import { getCurrentUserType } from '../../../state/app/selectors';
import { allTopologies } from '../../../topologies';
import { cardVoteEventTopology } from '../../../topologies/CardVoteEvent';

class CurrentVote extends PropertyBase {
  shouldComponentUpdate(nextProps) {
    return this.props.subject !== nextProps.subject
      || this.props.linkVersion !== nextProps.linkVersion
      || this.props.currentVote !== nextProps.currentVote;
  }

  getEntryPoint() {
    const base = new URL(this.props.base.replace('/od/', '/lr/'));
    base.searchParams.set('filter[]', `option=${this.props.side.term}`);
    return this.props.lrs.getResourceProperty(
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
        .props
        .lrs
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

      this.topology = cardVoteEventTopology;
    }

    signInFlow() {
      if (!this.props.showSignInFlow) {
        return null;
      }

      return (
        <SignInFormContainerCardRow
          r={currentURL()}
          reason={(
            <FormattedMessage
              defaultMessage="Confirm your vote via e-mail:"
              id="https://app.argu.co/i18n/voteFlow/confirmMessage"
            />
          )}
        />
      );
    }

    render() {
      const voteButtons = options.map(side => (
        <CurrentVote
          base={this.props.votes.value}
          currentVote={this.props.currentVote}
          dataSubjects={this.props.dataSubjects}
          key={side}
          lrs={this.props.lrs}
          side={side}
        />
      ));

      return this.wrap((
        <React.Fragment>
          <div itemScope style={{ display: 'flex' }}>
            {voteButtons}
          </div>
          {this.signInFlow()}
        </React.Fragment>
      ));
    }
  }

  return connect((state, ownProps) => ({
    showSignInFlow: ownProps.currentVote
      && ['GuestUser', 'UnconfirmedUser'].includes(getCurrentUserType(state)),
  }))(withLinkCtx(VoteButtons));
};

export default LinkedRenderStore.registerRenderer(
  link({
    currentVote: NS.argu('currentVote'),
    dataSubjects: NS.argu('currentVote'),
    votes: NS.argu('votes'),
  })(getVoteButtons([NS.argu('yes'), NS.argu('other'), NS.argu('no')])),
  NS.argu('VoteEvent'),
  NS.argu('currentVote'),
  allTopologies
);
