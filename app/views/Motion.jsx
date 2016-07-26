// @flow
import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';
import MotionContainer from '../containers/MotionContainer';
import { Container } from '../components';
import Helmet from 'react-helmet';

const propTypes = {
  params: PropTypes.shape({
    motionId: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
};

const Motion = ({ title, params }) => (
  <Container>
    <Helmet title={title} />
    <MotionContainer motionId={params.motionId} />

    {
      /*
      <Columns>
        <div>
          <Heading size="3" section>Voordelen</Heading>
          <List renderItem={ArgumentShow} list={argumentsPro} />
        </div>

        <div>
          <Heading size="3" section>Nadelen</Heading>
        </div>
      </Columns>
      */
    }
  </Container>
);

Motion.propTypes = propTypes;

export default Motion;
