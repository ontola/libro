import LinkedRenderStore from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  linkType,
  lrsType,
  TopologyProvider,
  withLinkCtx,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { SignInFormContainerCardRow } from '../../../containers/SignInFormContainer';
import { currentURL, retrievePath } from '../../../helpers/iris';
import { NS } from '../../../helpers/LinkedRenderStore';
import { getCurrentUserType } from '../../../state/app/selectors';
import { allTopologies } from '../../../topologies';
import { cardVoteEventTopology } from '../../../topologies/CardVoteEvent';

class CurrentVote extends React.PureComponent {
  static propTypes = {
    base: PropTypes.string,
    lrs: lrsType,
    option: linkType,
    side: linkType,
    subject: linkType,
  };

  getEntryPoint() {
    const base = new URL(this.props.base.replace('/od/', '/lr/'));
    base.searchParams.set('filter[]', `option=${this.props.side.term}`);
    return this.props.lrs.getResourceProperty(
      NS.app(`${retrievePath(base.toString()).slice(1)}`),
      NS.argu('createAction')
    );
  }

  render() {
    const entryPoint = this.getEntryPoint();

    if (!entryPoint) {
      return null;
    }

    return (
      <LinkedResourceContainer
        current={this.props.option !== undefined && this.props.option === this.props.side}
        currentVote={this.props.subject}
        subject={entryPoint}
        variant={this.props.side.term}
      />
    );
  }
}

const CurrentVoteConnected = link(
  [NS.schema('option')],
  { forceRender: true }
)(CurrentVote);

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
      const voteButtons = options.map((side) => {
        const voteComp = (
          <CurrentVoteConnected
            base={this.props.votes.value}
            key={side}
            side={side}
          />
        );
        if (this.props.currentVote) {
          return (
            <LinkedResourceContainer subject={this.props.currentVote}>
              {voteComp}
            </LinkedResourceContainer>
          );
        }

        return voteComp;
      });

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
    votes: NS.argu('votes'),
  })(getVoteButtons([NS.argu('yes'), NS.argu('other'), NS.argu('no')])),
  NS.argu('VoteEvent'),
  NS.argu('currentVote'),
  allTopologies
);
