import React, { Component, PropTypes } from 'react';

import {
  Cover,
  Container,
  MotionCompare,
} from 'components';

import MotionContainer from 'containers/MotionContainer';
import ScoreSheetContainer from 'containers/ScoreSheetContainer';

const propTypes = {
  currentIndex: PropTypes.number,
  motionIds: PropTypes.array.isRequired,
  voteMatchId: PropTypes.string.isRequired,
};

const defaultProps = {
  currentIndex: 0,
  motionIds: [],
};

class VoteMatchShow extends Component {
  constructor() {
    super();
    this.scrollTo = this.scrollTo.bind(this);
  }

  componentWillUpdate(nextProps) {
    const {
      currentIndex,
      motionIds,
    } = nextProps;

    if (currentIndex === motionIds.length) {
      this.scrollTo('results');
    } else {
      this.scrollTo(`motion${motionIds[currentIndex]}`);
    }
  }

  scrollTo(id) {
    return this.refs[id] && this.refs[id].scrollIntoView();
  }

  render() {
    const {
      motionIds,
      voteMatchId,
    } = this.props;

    return (
      <div className="VoteMatchShow">
        <div className="VoteMatchShow__motionsList">
          {motionIds.map(id => (
            <div className="VoteMatchShow__motion" ref={`motion${id}`} key={id}>
              <Cover fullScreen>
                <Container>
                  <MotionContainer
                    motionId={id}
                    renderItem={MotionCompare}
                    voteMatchActive
                  />
                </Container>
              </Cover>
            </div>
          ))}
        </div>
        <div className="VoteMatchShow__results" ref="results">
          <Cover fullScreen>
            <Container>
              <ScoreSheetContainer id={voteMatchId} />
            </Container>
          </Cover>
        </div>
      </div>
    );
  }
}

VoteMatchShow.propTypes = propTypes;
VoteMatchShow.defaultProps = defaultProps;

export default VoteMatchShow;
