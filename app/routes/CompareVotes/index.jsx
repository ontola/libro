import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Map } from 'immutable';

import { Container, Cover, MotionCompare, ProgressBar } from 'components';
import ScoreSheetContainer from 'containers/ScoreSheetContainer';
import MotionContainer from 'containers/MotionContainer';
import Person from 'models/Person';

import { getPersonName } from 'state/persons/selectors';
import { getVoteMatchMotionsSize, getVoteMatchCurrentIndex } from 'state/votematch/selectors';
import { voteMatchStart } from 'state/votematch/actions';

const motionData = new Map({
  0: new Map({
    motionId: '642621',
    compareResult: 'pro',
  }),
  1: new Map({
    motionId: '245245',
    compareResult: 'con',
  }),
  2: new Map({
    motionId: '195075',
    compareResult: 'neutral',
  }),
});

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
      currentIndex: null,
      compareWithPerson: params.userId,
      items: motionData,
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
      const currentMotionIndex = motionData.find((val, key) => Number(key) === currentIndex);
      this.scrollTo(`motion${currentMotionIndex.get('motionId')}`);
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
            <MotionContainer motionId={motion} renderItem={MotionCompare} />
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

    const mapMotions = motion => this.renderMotion(motion.get('motionId'));
    const motionsMap = motionData.valueSeq().map(mapMotions);

    return (
      <div>
        <Helmet title={`Vergelijk opinies met ${name}`} />
        <div>{motionsMap}</div>
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
