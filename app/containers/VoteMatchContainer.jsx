import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  Cover,
  Container,
  MotionCompare,
} from 'components';

import {
  getVoteMatchCurrentIndex,
  getVoteMatchMotionsLength,
  getVoteMatchMotions,
} from 'state/votematch/selectors';

import MotionContainer from 'containers/MotionContainer';
import { voteMatchStart } from 'state/votematch/actions';

const propTypes = {
  id: PropTypes.string.isRequired,
  motionIds: PropTypes.node,
  onStartVoteMatch: PropTypes.func.isRequired,
};

const defaultProps = {
  motionIds: [],
};

class VoteMatchContainer extends Component {
  constructor() {
    super();

    this.renderMotions = this.renderMotions.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
  }

  componentWillMount() {
    const { id, onStartVoteMatch } = this.props;
    onStartVoteMatch({ id });
  }

  componentWillUpdate(nextProps) {
    const {
      currentIndex,
      motionsLength,
      motionIds,
    } = nextProps;

    if (this.refs.length > 0) {
      if (currentIndex === motionsLength) {
        this.scrollTo('result');
      } else {
        this.scrollTo(`motion${motionIds[currentIndex]}`);
      }
    }
  }

  scrollTo(id) {
    this.refs[id].scrollIntoView();
  }

  renderMotions() {
    return this.props.motionIds.map(motion => (
      <div ref={`motion${motion}`} key={motion}>
        <Cover fullScreen>
          <Container>
            <MotionContainer
              motionId={motion}
              renderItem={MotionCompare}
              voteMatchActive
            />
          </Container>
        </Cover>
      </div>
    ));
  }

  render() {
    return <div>{this.renderMotions()}</div>;
  }
}

VoteMatchContainer.propTypes = propTypes;
VoteMatchContainer.defaultProps = defaultProps;

export default connect(
  (state, props) => ({
    currentIndex: getVoteMatchCurrentIndex(state, props),
    motionsLength: getVoteMatchMotionsLength(state, props),
    motionIds: getVoteMatchMotions(state, props),
  }),
  (dispatch) => ({
    onStartVoteMatch: (record) => { dispatch(voteMatchStart(record)); },
  })
)(VoteMatchContainer);
