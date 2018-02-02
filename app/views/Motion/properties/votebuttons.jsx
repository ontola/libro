import HttpStatus from 'http-status-codes';
import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, Property, PropertyBase } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  CardActions,
  CardButton,
} from '../../../components';
import { FRONTEND_URL } from '../../../config';
import {
  json,
  safeCredentials,
  statusSuccess,
  tryLogin,
} from '../../../helpers/arguHelpers';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  buttonsType: PropTypes.string,
  closed: PropTypes.bool,
  currentVote: PropTypes.string,
  objectId: PropTypes.number,
  objectType: PropTypes.string,
  onVoteCompleted: PropTypes.func,
  r: PropTypes.string,
  vote_url: PropTypes.string,
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
    const url = new URL(this.props.subject.value);
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
        if (e.status === HttpStatus.FORBIDDEN) {
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
        const childProps = Object.assign({}, this.props, { forceRender: undefined, label: NS.argu('voteableVoteEvent') });
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
  NS.argu('Motion'),
  NS.argu('currentVote')
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
  NS.argu('LinkedRecord'),
  NS.argu('voteableVoteEvent')
);

LinkedRenderStore.registerRenderer(
  linkedRecordWrapper(VoteButtons),
  NS.argu('Motion'),
  NS.argu('currentVote'),
  NS.argu('voteMatch')
);
