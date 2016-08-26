import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Map } from 'immutable';

import {
  Container,
  Cover,
  ProgressBar,
} from 'components';

import ScoreSheetContainer from 'containers/ScoreSheetContainer';
import MotionContainer from 'containers/MotionContainer';
import Person from 'models/Person';

import { getPersonName } from 'state/persons/selectors';
import { getVoteMatchMotionsSize, getVoteMatchCurrentIndex } from 'state/votematch/selectors';
import { voteMatchStart } from 'state/votematch/actions';

const motions = ['642621', '245245', '195075'];
const compareWithResults = ['pro', 'con', 'neutral'];

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
      compareWithResults,
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
        <div>{motions.map(this.renderMotion)}</div>
        <div ref="result">
          <Cover fullScreen>
            <Container>
              <ScoreSheetContainer />
            </Container>
          </Cover>
        </div>
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
    name: getPersonName(state, ownProps),
    currentIndex: getVoteMatchCurrentIndex(state),
    motionsLength: getVoteMatchMotionsSize(state),
  }),
  (dispatch) => ({
    start: (data) => { dispatch(voteMatchStart(data)); },
    loadPerson: (id) => { dispatch(Person.fetch(id)); },
  })
)(CompareVotes);
