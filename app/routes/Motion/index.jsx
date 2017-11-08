import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  ArgumentForm,
  ArgumentShow,
  BackButton,
  Button,
  Columns,
  Container,
  Heading,
  List,
} from 'components';
import MotionContainer from 'containers/MotionContainer';
import VoteEventContainer from 'containers/VoteEventContainer';
import path from 'helpers/paths';
import Argument from 'models/Argument';
import VoteEvent from 'models/VoteEvent';
import { getArgsCon, getArgsPro } from 'state/argumentations/selectors';
import { getMotionTitle, getMotionVoteEvents } from 'state/motions/selectors';

const propTypes = {
  argsPro: PropTypes.arrayOf(Argument),
  argsCon: PropTypes.arrayOf(Argument),
  formConOpen: PropTypes.bool,
  formProOpen: PropTypes.bool,
  params: PropTypes.shape({
    motionId: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
  voteEvents: PropTypes.arrayOf(VoteEvent),
};

const defaultProps = {
  argsPro: [],
  argsCon: [],
  formConOpen: true,
  formProOpen: false,
};

const renderArgument = data => (
  <ArgumentShow
    createdAt={data.createdAt}
    creator={data.creator}
    key={data.id}
    name={data.name}
    side={data.side}
    text={data.text}
  />
);

const Motion = ({
  argsPro,
  argsCon,
  formConOpen,
  formProOpen,
  params,
  title,
  voteEvents,
}) => (
  <div>
    <Container>
      <Helmet title={title} />
      <BackButton link={path.motionsIndex()}>Terug naar alle moties</BackButton>
      <MotionContainer motionId={params.motionId} />
      {voteEvents &&
        <VoteEventContainer voteEventId={voteEvents[0]} />
      }
    </Container>
    <Container size="large">
      <Columns column-size="medium" total-size="large">
        <div>
          <Heading size="3" variant="column">Voordelen</Heading>
          <List
            items={argsPro}
            renderItem={renderArgument}
          />
          {!formProOpen &&
            <Button
              icon="plus"
              theme="transparant"
            >
              Voordeel toevoegen
            </Button>}
          {formProOpen &&
            <ArgumentForm
              motionId={params.motionId}
              side="pro"
            />
          }
        </div>
        <div>
          <Heading size="3" variant="column">Problemen</Heading>
          <List
            items={argsCon}
            renderItem={renderArgument}
          />
          {!formConOpen &&
            <Button
              icon="plus"
              theme="transparant"
            >
              Probleem toevoegen
            </Button>
          }
          {formConOpen &&
            <ArgumentForm
              motionId={params.motionId}
              side="con"
            />
          }
        </div>
      </Columns>
    </Container>
  </div>
);

Motion.defaultProps = defaultProps;
Motion.propTypes = propTypes;

const stateToProps = (state, ownProps) => ({
  title: getMotionTitle(state, ownProps),
  voteEvents: getMotionVoteEvents(state, ownProps),
  argsPro: getArgsPro(state, ownProps),
  argsCon: getArgsCon(state, ownProps),
});

export default connect(stateToProps)(Motion);
