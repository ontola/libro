// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { voteMatchNext } from '../actions';
import { Button, Container, Heading } from '../components';
import CompareVotesContainer from '../containers/CompareVotesContainer';

const propTypes = {
  name: PropTypes.string.isRequired,
  params: PropTypes.object,
  nextMotion: PropTypes.func,
  currentIndex: PropTypes.number,
  motionsLength: PropTypes.number,
};

const defaultProps = {
  name: '',
};

const CompareVotes = ({ name, currentIndex, motionsLength, nextMotion, params }) => (
  <Container>
    <Heading>Vergelijk jouw stem met die van {name}</Heading>
    {currentIndex + 1 > motionsLength &&
      <div>Uitslag komt hier!</div>
    }
    <CompareVotesContainer compareWith={params.userId} />

    {currentIndex !== null &&
      <div>
        {currentIndex + 1} van {motionsLength}{' '}
        {currentIndex + 1 < motionsLength &&
          <Button onClick={() => nextMotion()}>Overslaan</Button>
        }
      </div>
    }

    <div>
      {currentIndex + 1 === motionsLength && <Button>Uitslag bekijken</Button>}
    </div>
  </Container>
);

CompareVotes.propTypes = propTypes;
CompareVotes.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    name: state.getIn(['persons', 'items', ownProps.params.userId, 'name']),
    currentIndex: state.getIn(['compareVotes', 'currentIndex']),
    motionsLength: state.getIn(['compareVotes', 'motionIds']).size,
  }),
  (dispatch) => ({
    nextMotion: () => dispatch(voteMatchNext()),
  })
)(CompareVotes);
