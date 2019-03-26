import LinkedRenderStore from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  linkType,
  lrsType,
  TopologyProvider,
  withLinkCtx,
  withLRS,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { SignInFormContainerCardRow } from '../../../containers/SignInFormContainer';
import { currentURL } from '../../../helpers/iris';
import { NS } from '../../../helpers/LinkedRenderStore';
import { getCurrentUserType } from '../../../state/app/selectors';
import { allTopologies } from '../../../topologies';
import { cardVoteEventTopology } from '../../../topologies/CardVoteEvent';

class CurrentVote extends React.PureComponent {
  static propTypes = {
    base: PropTypes.instanceOf(NamedNode),
    lrs: lrsType,
    option: linkType,
    side: linkType,
    subject: linkType,
  };

  getBaseCollection() {
    const base = new URL(this.props.base.value.replace('/od/', '/lr/'));
    base.searchParams.set('filter[]', `option=${this.props.side.term}`);

    return NamedNode.find(base);
  }

  getEntryPoint() {
    return this.props.lrs.getResourceProperty(
      this.getBaseCollection(),
      NS.argu('createAction')
    );
  }

  getSideVoteCount() {
    return this.props.lrs.getResourceProperty(
      this.getBaseCollection(),
      NS.as('totalItems')
    );
  }

  render() {
    const entryPoint = this.getEntryPoint();

    if (!entryPoint) {
      return null;
    }

    return (
      <LinkedResourceContainer
        count={this.getSideVoteCount()}
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
)(withLRS(CurrentVote));

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
            base={this.props.votes}
            key={side}
            side={side}
          />
        );
        if (this.props.currentVote) {
          return (
            <LinkedResourceContainer key={side} subject={this.props.currentVote}>
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
