// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { getArgumentsByMotion } from '../reducers/motions';
import MotionContainer from '../containers/MotionContainer';
import { ArgumentShow, Columns, Container, Heading, List } from '../components';

const propTypes = {
  params: PropTypes.shape({
    motionId: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
  argumentations: PropTypes.array,
};

const defaultProps = {
  argumentations: [],
};

const renderArgument = (data) => (
  <ArgumentShow
    key={data.id}
    data={data}
  />
);

const Motion = ({ title, params, argumentations }) => (
  <Container>
    <Helmet title={title} />
    <MotionContainer motionId={params.motionId} />
    <Columns>
      {argumentations.length > 0 &&
        <div>
          <Heading size="3" section>Voordelen</Heading>
          <List
            renderItem={renderArgument}
            items={argumentations.filter(a => a.side === 'pro')}
          />
        </div>
      }
      {argumentations.length > 0 &&
        <div>
          <Heading size="3" section>Nadelen</Heading>
          <List
            renderItem={renderArgument}
            items={argumentations.filter(a => a.side === 'con')}
          />
        </div>
      }
    </Columns>
  </Container>
);

Motion.defaultProps = defaultProps;
Motion.propTypes = propTypes;

const stateToProps = (state, ownProps) => {
  const currentMotion = state.getIn(['motions', 'items', ownProps.params.motionId]);

  return {
    title: currentMotion && currentMotion.title,
    argumentations: getArgumentsByMotion(state, ownProps),
  };
};

export default connect(stateToProps)(Motion);
