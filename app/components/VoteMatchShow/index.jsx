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
  onSave: PropTypes.func.isRequired,
  voteMatchId: PropTypes.string.isRequired,
};

const defaultProps = {
  motionIds: [],
};

class VoteMatchShow extends Component {
  constructor() {
    super();
    this.sections = {};
    this.scrollTo = this.scrollTo.bind(this);
  }

  componentWillUpdate(nextProps) {
    const {
      currentIndex,
      motionIds,
      onSave,
      similarity,
      voteMatchId,
    } = nextProps;

    if (currentIndex === motionIds.length) {
      onSave({
        id: voteMatchId,
        similarity,
      });
      this.scrollTo('results');
    } else {
      this.scrollTo(motionIds[currentIndex]);
    }
  }

  scrollTo(id) {
    return this.sections[id] && this.sections[id].scrollIntoView({ behavior: 'smooth' });
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
            <div
              className="VoteMatchShow__motion"
              ref={(r) => { this.sections[id] = r; }}
              key={id}
            >
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
        <div className="VoteMatchShow__results" ref={(r) => { this.sections.results = r; }}>
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
