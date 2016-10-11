import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  ArgumentShow,
  BackButton,
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
  params: PropTypes.shape({
    motionId: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
};

const defaultProps = {
  argsPro: [],
  argsCon: [],
};

const renderArgument = (data) => (
  <ArgumentShow
    key={data.id}
    title={data.title}
    children={data.content}
    creator={data.creator}
    side={data.side}
    createdAt={data.createdAt}
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
    <BackButton
      children="Terug naar alle moties"
      link={path.motionsIndex()}
    />
    <MotionContainer motionId={params.motionId} />
    <VoteDataContainer motionId={params.motionId} />
    <Columns>
      <div>
        <Heading variant="column" size="3">Voordelen</Heading>
        <List
          renderItem={renderArgument}
          items={argsPro}
        />
      </div>
      <div>
        <Heading variant="column" size="3">Nadelen</Heading>
        <List
          renderItem={renderArgument}
          items={argsCon}
        />
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
