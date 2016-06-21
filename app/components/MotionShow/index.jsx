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
  DetailsBar,
  Heading,
  MarkdownContent,
  VoteButtons,
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
  onVote: PropTypes.func,
};

const defaultProps = {
  data: {
    title: 'Laden...',
    votes: false,
    arguments: [],
    relations: {},
  },
};

function MotionShow({ data, onVote }) {
  const argumentsList = data.arguments || [];
  const pro = argumentsList.filter(e => e.side === 'pro');
  const con = argumentsList.filter(e => e.side === 'con');

  return (
    <div>
      <Box ghost>
        <div className="MotionShow_navigation">
          <div className="MotionShow_navigation_link">
            {data.relations.previousMotion !== null &&
              <Link to={`/motion/${data.relations.previousMotion}`}>
                <FontAwesome name="arrow-left" />{' '}
                Vorige
              </Link>
            }
          </div>
          <div className="MotionShow_navigation_link">
            {data.relations.nextMotion !== null &&
              <Link to={`/motion/${data.relations.nextMotion}`}>
                Volgende{' '}
                <FontAwesome name="arrow-right" />
              </Link>
            }
          </div>
        </div>
      </Box>

      <Box>
        <div className="box__content">
          <Heading size="2">{data.title}</Heading>
          <DetailsBar>
            <Detail text="Motie" icon="lightbulb-o" />
            <Detail text="Verworpen" icon="close" />
            <Detail text="Joep Meindertsma" icon="user" />
            <Detail text="3 minuten geleden" icon="clock-o" />
          </DetailsBar>
          <MarkdownContent content={data.description} />
        </div>

        <VoteButtons identifier={data.identifier} onVote={onVote} />
      </Box>

      <VoteData data={data.votes} expanded />
      <Columns>
        {pro.length > 0 &&
          <div>
            <Box ghost><Heading size="4">Voordelen</Heading></Box>
            {pro.map(a => <Argument key={a.id} data={a} />)}
          </div>
        }

        {con.length > 0 &&
          <div>
            <Box ghost><Heading size="4">Nadelen</Heading></Box>
            {con.map(a => <Argument key={a.id} data={a} />)}
          </div>
        }
      </Columns>
    </div>
  );
}

MotionShow.propTypes = propTypes;
MotionShow.defaultProps = defaultProps;

export default MotionShow;
