// @flow
import './motionShow.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {
  Argument,
  Box,
  Columns,
  Detail,
  DetailProfile,
  DetailsBar,
  DetailStatus,
  DetailType,
  Heading,
  MarkdownContent,
  VoteData,
} from '../';

const propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    votes: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    arguments: PropTypes.array,
    relations: PropTypes.object,
  }),
};

const defaultProps = {
  data: {
    title: 'Laden...',
    votes: false,
    arguments: [],
    relations: {},
  },
};

class MotionShow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    const pro = data.arguments && data.arguments.filter(e => e.side === 'pro');
    const con = data.arguments && data.arguments.filter(e => e.side === 'con');

    const buttons = [{
      label: 'Ik ben voor',
      icon: 'thumbs-up',
      action() {
        console.log('Ik ben voor:', data.title);
      },
    }, {
      label: 'Neutraal',
      icon: 'pause',
      action() {
        console.log('Ik ben neutraal:', data.title);
      },
    }, {
      label: 'Ik ben tegen',
      icon: 'thumbs-down',
      action() {
        console.log('Ik ben tegen:', data.title);
      },
    }];

    return (
      <div>
        <Box ghost>
          <div className="MotionShow_navigation">
            <div className="MotionShow_navigation_link">{ data.relations.previousMotion !== null && <Link to={`/motion/${data.relations.previousMotion}`}><FontAwesome name="arrow-left" /> Vorige</Link>}</div>
            <div className="MotionShow_navigation_link">{ data.relations.nextMotion !== null && <Link to={`/motion/${data.relations.nextMotion}`}>Volgende <FontAwesome name="arrow-right" /></Link>}</div>
          </div>
        </Box>

        <Box buttons={buttons}>
          <Heading size="2">{data.title}</Heading>
          <DetailsBar>
            <Detail text="Motie" icon="lightbulb-o" />
            <Detail text="Verworpen" icon="close" />
            <Detail text="Joep Meindertsma" icon="user" />
            <Detail text="3 minuten geleden" icon="clock-o" />
          </DetailsBar>
          <MarkdownContent content={data.description} />
        </Box>
        <VoteData data={data.votes} expanded />
        <Columns>
          <div>
            <Box ghost><Heading size="4">Voordelen</Heading></Box>
            { pro && pro.map(a => <Argument key={a.id} data={a}/>) }
          </div>
          <div>
            <Box ghost><Heading size="4">Nadelen</Heading></Box>
            { con && con.map(a => <Argument key={a.id} data={a} />) }
          </div>
        </Columns>
      </div>
    );
  }
}

MotionShow.propTypes = propTypes;
MotionShow.defaultProps = defaultProps;

export default MotionShow;
