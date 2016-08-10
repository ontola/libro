// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { voteMatchStart } from '../actions';
import MotionContainer from '../containers/MotionContainer';
import Person from '../models/Person';
import {
  Box,
  Container,
  Cover,
  Heading,
  ProgressBar,
  ScoreSheet,
} from '../components';

const motions = ['642621', '245245', '195075', '358964', '987654', '334672', '367333'];

const propTypes = {
  currentIndex: PropTypes.number,
  loadPerson: PropTypes.func.isRequired,
  motionsLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  params: PropTypes.shape({
    userId: PropTypes.string.isRequired,
  }).isRequired,
  start: PropTypes.func,
};

const defaultProps = {
  name: '',
};

class CompareVotes extends Component {
  componentWillMount() {
    const {
      loadPerson,
      name,
      params,
      start,
    } = this.props;

    start({
      compareWithPerson: params.userId,
      currentIndex: null,
      motionIds: motions,
    });

    if (name === '') {
      loadPerson(params.userId);
    }
  }

  componentWillUpdate(nextProps) {
    const {
      currentIndex,
      motionsLength,
    } = nextProps;

    if (currentIndex === motionsLength) {
      this.scrollTo('result');
    } else {
      this.scrollTo(`motion${motions[currentIndex]}`);
    }
  }

  scrollTo(id) {
    this.refs[id].scrollIntoView();
  }

  renderMotion(motion) {
    return (
      <div ref={`motion${motion}`} key={motion}>
        <Cover fullScreen>
          <Container>
            <MotionContainer
              motionId={motion}
              showArguments
              activeVoteMatch
            />
          </Container>
        </Cover>
      </div>
    );
  }

  render() {
    const {
      currentIndex,
      motionsLength,
      name,
    } = this.props;

    return (
      <div>
        <Helmet title={`Vergelijk opinies met ${name}`} />
        <div ref="result">
          <Cover fullScreen>
            <Container>
              <ScoreSheet />
            </Container>
          </Cover>
        </div>
        <div>{motions.map(this.renderMotion)}</div>
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
  (state, ownProps) => ({
    name: state.getIn(['persons', 'items', ownProps.params.userId, 'name']),
    currentIndex: state.getIn(['compareVotes', 'currentIndex']),
    motionsLength: state.getIn(['compareVotes', 'motionIds']).size,
  }),
  (dispatch) => ({
    start: (data) => { dispatch(voteMatchStart(data)); },
    loadPerson: (id) => { dispatch(Person.fetch(id)); },
  })
)(CompareVotes);
