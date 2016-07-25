// @flow
import React, { PropTypes } from 'react';
import { MotionContainer, ArgumentsContainer } from '../containers';
import { Container, Columns, Heading } from '../components';
import Helmet from 'react-helmet';

const propTypes = {
  params: PropTypes.shape({
    motionId: PropTypes.string.isRequired,
  }),
};

const Motion = ({ params }) => (
  <Container>
    <Helmet title="Motion" />
    <MotionContainer motionId={params.motionId} />
    <Columns>
      <div>
        <Heading size="3" section>Voordelen</Heading>
        <ArgumentsContainer motionId={params.motionId} side="pro" />
      </div>

      <div>
        <Heading size="3" section>Nadelen</Heading>
      </div>
    </Columns>
  </Container>
);

Motion.propTypes = propTypes;

export default Motion;
