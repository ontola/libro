// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { voteMatchStart } from '../actions';
import { Container, Cover, VoteMatchProgress } from '../components';
import MotionContainer from '../containers/MotionContainer';
import Person from '../models/Person';

const motions = ['642621', '245245', '195075', '358964'];

const propTypes = {
  currentIndex: PropTypes.number,
  loadPerson: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  params: PropTypes.shape({
    userId: PropTypes.string.isRequired,
  }).isRequired,
  motionsLength: PropTypes.number,
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
      motionIds: motions,
    });

    if (name === '') {
      loadPerson(params.userId);
    }
  }

  scrollTo(id) {
    this.refs[id].scrollIntoView(true);
  }

  renderMotion(motion, i) {
    const {
      currentIndex,
      motionsLength,
    } = this.props;

    if (currentIndex === motionsLength) {
      this.scrollTo('result');
    } else if (i === currentIndex) {
      this.scrollTo(`motion${motion}`);
    }

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
        {motions.map((motion, i) => this.renderMotion(motion, i))}
        <Cover fullScreen>
          <Container>
            <div ref="result">
              Resultaat
            </div>
          </Container>
        </Cover>
        <VoteMatchProgress
          compareTo={name}
          completedMotions={currentIndex}
          totalMotions={motionsLength}
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
