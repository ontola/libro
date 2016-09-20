import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { Container, Cover, ProgressBar } from 'components';
import ScoreSheetContainer from 'containers/ScoreSheetContainer';
import VoteMatchContainer from 'containers/VoteMatchContainer';

import Person from 'models/Person';
import { getPersonName } from 'state/persons/selectors';

import {
  getVoteMatchCurrentIndex,
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
    const {
      loadPerson,
      name,
      params,
    } = this.props;


    if (name === '') {
      loadPerson(params.userId);
    }
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
        <VoteMatchContainer id={this.props.params.userId} />
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
  (state, props) => ({
    name: getPersonName(state, props),
    currentIndex: getVoteMatchCurrentIndex(state, props),
    motionsLength: getVoteMatchMotionsLength(state, props),
  }),
  (dispatch) => ({
    loadPerson: (id) => { dispatch(Person.fetch(id)); },
  })
)(CompareVotes);
