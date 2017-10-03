import React, { Component, PropTypes } from 'react';

import MotionContainer from 'containers/MotionContainer';
import VoteMatchResultProfileContainer from 'containers/VoteMatchResultProfileContainer';

import Button from '../Button';
import Card, {
  CardContent,
} from '../Card';
import Cover from '../Cover';
import Container from '../Container';
import Heading from '../Heading';
import MotionCompare from '../MotionCompare';

const propTypes = {
  comparedProfiles: PropTypes.array.isRequired,
  currentIndex: PropTypes.number,
  motionIds: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
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
      comparedProfiles,
      motionIds,
      name,
      text,
      voteMatchId,
    } = this.props;

    return (
      <div className="VoteMatchShow">
        <div className="VoteMatchShow__intro">
          <Cover fullScreen>
            <Container>
              <Card>
                <CardContent>
                  <Heading>
                    {name}
                  </Heading>
                  {text}
                </CardContent>
              </Card>
              <Button
                onClick={() => this.scrollTo(motionIds[0])}
              >
                Start
              </Button>
            </Container>
          </Cover>
        </div>
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
              <Card>
                {comparedProfiles.map(profile => (
                  <VoteMatchResultProfileContainer
                    profileId={profile}
                    voteMatchId={voteMatchId}
                    motionIds={motionIds}
                  />
                ))}
              </Card>
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
