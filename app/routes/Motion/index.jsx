import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  ArgumentShow,
  BackButton,
  Button,
  Columns,
  Container,
  Heading,
  List,
} from 'components';

import { getMotionTitle } from 'state/motions/selectors';
import { getArgsPro, getArgsCon } from 'state/argumentations/selectors';
import MotionContainer from 'containers/MotionContainer';
import VoteDataContainer from 'containers/VoteDataContainer';
import path from 'helpers/paths';

const propTypes = {
  argsPro: PropTypes.array,
  argsCon: PropTypes.array,
  params: PropTypes.object.isRequired,
  title: PropTypes.string,
};

const defaultProps = {
  argsPro: [],
  argsCon: [],
};

const renderArgument = data => (
  <ArgumentShow
    key={data.id}
    title={data.title}
    creator={data.creator}
    side={data.side}
    createdAt={data.createdAt}
    text={data.text}
  />
);

const Motion = ({
  argsPro,
  argsCon,
  params,
  title,
}) => (
  <Container>
    <Helmet title={title} />
    <BackButton link={path.motionsIndex()}>Terug naar alle moties</BackButton>
    <MotionContainer motionId={params.motionId} />
    <VoteDataContainer motionId={params.motionId} />
    <Columns>
      <div>
        <Heading variant="column" size="3">Voordelen</Heading>
        <List
          renderItem={renderArgument}
          items={argsPro}
        />
        <Button
          icon="plus"
          theme="transparant"
        >
          Voordeel toevoegen
        </Button>
      </div>
      <div>
        <Heading variant="column" size="3">Problemen</Heading>
        <List
          renderItem={renderArgument}
          items={argsCon}
        />
        <Button
          icon="plus"
          theme="transparant"
        >
          Probleem toevoegen
        </Button>
      </div>
    </Columns>
  </Container>
);

Motion.defaultProps = defaultProps;
Motion.propTypes = propTypes;

const stateToProps = (state, ownProps) => ({
  title: getMotionTitle(state, ownProps),
  argsPro: getArgsPro(state, ownProps),
  argsCon: getArgsCon(state, ownProps),
});

export default connect(stateToProps)(Motion);
