/* eslint-disable max-classes-per-file */

import { term } from '@rdfdev/iri';
import RDFTypes from '@rdfdev/prop-types';
import as from '@ontologies/as';
import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  Resource,
  TopologyProvider,
  link,
  linkType,
  lrsType,
  withLRS,
  withLinkCtx,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { SignInFormContainerCardRow } from '../../../containers/SignInFormContainer';
import { currentURL } from '../../../helpers/iris';
import { NS } from '../../../helpers/LinkedRenderStore';
import ontola from '../../../ontology/ontola';
import { getCurrentUserType } from '../../../state/app/selectors';
import { allTopologies } from '../../../topologies';
import { cardVoteEventTopology } from '../../../topologies/CardVoteEvent';

class CurrentVote extends React.PureComponent {
  static propTypes = {
    baseCollection: RDFTypes.namedNode,
    lrs: lrsType,
    option: linkType,
    side: linkType,
    subject: linkType,
  };

  getEntryPoint() {
    return this.props.lrs.getResourceProperty(
      this.props.baseCollection,
      ontola.createAction
    );
  }

  getSideVoteCount() {
    return this.props.lrs.getResourceProperty(
      this.props.baseCollection,
      as.totalItems
    );
  }

  render() {
    const entryPoint = this.getEntryPoint();

    if (!entryPoint) {
      return null;
    }

    return (
      <Resource
        count={this.getSideVoteCount()}
        current={this.props.option !== undefined && rdf.equals(this.props.option, this.props.side)}
        currentVote={this.props.subject}
        subject={entryPoint}
        variant={term(this.props.side)}
      />
    );
  }
}

const baseCollectionWrapper = (Comp) => {
  const BaseCollectionListener = (props) => {
    const base = new URL(props.base.value.replace('/od/', '/lr/'));
    base.searchParams.set('filter[]', `option=${term(props.side)}`);
    const baseIRI = rdf.namedNode(base.toString());

    return <Comp baseCollection={baseIRI} dataSubjects={[baseIRI]} {...props} />;
  };

  BaseCollectionListener.propTypes = {
    base: PropTypes.shape({
      termType: 'NamedNode',
      value: PropTypes.string,
    }),
    side: linkType,
  };

  return BaseCollectionListener;
};

const CurrentVoteConnected = baseCollectionWrapper(link(
  [schema.option],
  { forceRender: true }
)(withLRS(CurrentVote)));

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

      const currentOption = this.props.lrs.getResourceProperty(
        this.props.currentVote,
        schema.option
      );
      if (!currentOption || rdf.equals(currentOption, NS.argu('abstain'))) {
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
            <Resource key={side} subject={this.props.currentVote}>
              {voteComp}
            </Resource>
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
    dataSubjects: NS.argu('currentVote'),
    votes: NS.argu('votes'),
  })(getVoteButtons([NS.argu('yes'), NS.argu('other'), NS.argu('no')])),
  NS.argu('VoteEvent'),
  NS.argu('currentVote'),
  allTopologies
);
