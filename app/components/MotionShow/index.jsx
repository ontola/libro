// @flow
import './motionShow.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Motion } from '../../models';
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
  data: PropTypes.instanceOf(Motion),
  onVote: PropTypes.func,
  loading: PropTypes.bool,
};

const defaultProps = {
  data: {},
};

function MotionShow({ data, onVote, loading }) {
  console.log(data);
  const argumentsList = data.arguments || [];
  const pro = argumentsList.filter(e => e.side === 'pro');
  const con = argumentsList.filter(e => e.side === 'con');

  return (
    <div>
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

      <Box>
        {loading ? <div>Laden...</div> :
          <div>
            <Heading size="2" children={data.title} />
            <DetailsBar>
              <Detail text="Motie" icon="lightbulb-o" />
              <Detail text="Verworpen" icon="close" />
              <Detail text="Joep Meindertsma" icon="user" />
              <Detail text="3 minuten geleden" icon="clock-o" />
            </DetailsBar>
            <MarkdownContent content={data.description} />
          </div>
        }
        <VoteButtons identifier={data.identifier} onVote={onVote} />
      </Box>

      <VoteData data={data.votes} expanded />
      <Columns>
        {pro.length > 0 &&
          <div>
            <Heading size="3" section>Voordelen</Heading>
            {pro.map(a => <Argument key={a.id} data={a} />)}
          </div>
        }

        {con.length > 0 &&
          <div>
            <Heading size="3" section>Nadelen</Heading>
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
