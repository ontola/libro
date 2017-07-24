import LinkedRenderStore, { defaultNS as NS } from 'link-lib';
import { LinkedObjectContainer, Property, PropertyBase } from 'link-redux';
import React from 'react';

import {
  CardActions,
  CardButton,
} from 'components';
import {
  safeCredentials,
  json,
  statusSuccess,
  tryLogin,
} from 'helpers/arguHelpers';

import { ARGU_API_URL, FRONTEND_URL } from '../../../config';

const propTypes = {
  actor: React.PropTypes.object,
  buttonsType: React.PropTypes.string,
  closed: React.PropTypes.bool,
  currentVote: React.PropTypes.string,
  objectId: React.PropTypes.number,
  objectType: React.PropTypes.string,
  onVoteCompleted: React.PropTypes.func,
  percent: React.PropTypes.object,
  r: React.PropTypes.string,
  vote_url: React.PropTypes.string,
};

class VoteButtons extends PropertyBase {
  constructor(props) {
    super();
    this.state = {
      currentVote: props.linkedProp,
    };
  }

  static createMembership(response) {
    return fetch(
      response.links.create_membership.href,
      safeCredentials({
        method: 'POST',
      })
    )
    .then(statusSuccess);
  }

  handleNotAMember(response) {
    if (response.type === 'error' &&
      response.error_id === 'NOT_A_MEMBER') {
      return this.createMembership(response)
      .then(() => this.vote(response.original_request.for));
    }
    return Promise.resolve();
  }

  vote(side) {
    const url = new URL(this.getLinkedObjectProperty(NS.rdf('subject')).replace(ARGU_API_URL, FRONTEND_URL));
    url.pathname += '/votes.json';
    fetch(
      url.toString(),
      safeCredentials({
        body: JSON.stringify({
          vote: {
            for: side,
          },
        }),
        headers: {
          'X-Allow-Guest': true,
        },
        method: 'POST',
      })
    )
    .then(statusSuccess, tryLogin)
    .then(json, tryLogin)
    .then((data) => {
      if (typeof data !== 'undefined') {
        this.setState(data.vote);
      }
    })
    .then(() => {
      if (this.props.onVoteCompleted) {
        return this.props.onVoteCompleted();
      }
      return Promise.resolve();
    })
    .catch((e) => {
      if (e.status === 403) {
        return e.json()
          .then(this.handleNotAMember);
      }
      // Bugsnag.notifyException(e);
      throw e;
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  render() {
    const voteButtons =
      ['pro', 'neutral', 'con'].map(side => (
        <CardButton
          action={() => this.vote(side)}
          active={this.state.currentVote === side}
          key={side}
          type={side}
        >
          {side}
        </CardButton>
      ));

    return (
      <CardActions>
        {voteButtons}
      </CardActions>
    );
  }
}

VoteButtons.propTypes = propTypes;


const linkedRecordWrapper = (Component) => {
  class LinkedRecordWrapper extends PropertyBase {
    isLinkedRecord() {
      const id = this.getLinkedObjectProperty(NS.rdf('subject'));
      return id && id.value.startsWith('https://beta.argu.co/nl/tweedekamer');
    }

    render() {
      if (this.isLinkedRecord()) {
        const childProps = Object.assign({}, this.props, { forceRender: undefined, label: 'argu:voteableVoteEvent' });
        return (
          <LinkedObjectContainer object={`${FRONTEND_URL}/lr?iri=${this.getLinkedObjectProperty(NS.rdf('subject'))}`}>
            <Property {...childProps} />
          </LinkedObjectContainer>
        );
      }
      return <Component {...this.props} />;
    }
  }

  return LinkedRecordWrapper;
};

LinkedRenderStore.registerRenderer(
  linkedRecordWrapper(VoteButtons),
  'argu:Motion',
  'argu:currentVote'
);

LinkedRenderStore.registerRenderer(
  class VoteableVoteEvent extends PropertyBase {
    render() {
      const p = this.getLinkedObjectProperty();
      return (
        <LinkedObjectContainer object={p}>
          <VoteButtons {...this.props} />
        </LinkedObjectContainer>
      );
    }
  },
  'argu:LinkedRecord',
  'argu:voteableVoteEvent'
);

LinkedRenderStore.registerRenderer(
  linkedRecordWrapper(VoteButtons),
  'argu:Motion',
  'argu:currentVote',
  'argu:voteMatch'
);
