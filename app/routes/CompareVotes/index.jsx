import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { ProgressBar } from 'components';
import VoteMatchContainer from 'containers/VoteMatchContainer';

import { fetchPerson } from 'state/persons/actions';
import { getPersonName } from 'state/persons/selectors';

import {
  getVoteMatchCountUserVotes,
  getVoteMatchMotionsLength,
} from 'state/votematch/selectors';

const propTypes = {
  currentIndex: PropTypes.number,
  loadPerson: PropTypes.func.isRequired,
  motionsLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  params: PropTypes.shape({
    userId: PropTypes.string.isRequired,
  }).isRequired,
};

const defaultProps = {
  name: '',
};

class CompareVotes extends Component {
  componentWillMount() {
    if (this.props.name === '') {
      this.props.loadPerson(this.props.params.userId);
    }
  }

  render() {
    const { currentIndex, motionsLength, name } = this.props;

    return (
      <div>
        <Helmet title={`Vergelijk opinies met ${name}`} />
        <VoteMatchContainer id={this.props.params.userId} />
        <ProgressBar
          context={`VoteMatch - ${name}`}
          completed={currentIndex}
          total={motionsLength}
        />
      </div>
    );
  }
}

CompareVotes.propTypes = propTypes;
CompareVotes.defaultProps = defaultProps;

export default connect(
  (state, props) => ({
    name: getPersonName(state, props),
    currentIndex: getVoteMatchCountUserVotes(state, props),
    motionsLength: getVoteMatchMotionsLength(state, props),
  }),
  (dispatch) => ({
    loadPerson: (id) => dispatch(fetchPerson(id)),
  })
)(CompareVotes);
