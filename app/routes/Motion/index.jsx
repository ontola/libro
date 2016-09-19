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
import { getArgs } from 'state/argumentations/selectors';
import MotionContainer from 'containers/MotionContainer';
import { formatDate } from 'helpers/date';

const MILLISECONDS_TO_SECONDS = 1000;

const propTypes = {
  argumentations: PropTypes.array,
  params: PropTypes.shape({
    motionId: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
};

const defaultProps = {
  argumentations: [],
};

const renderArgument = (data) => (
  <ArgumentShow
    key={data.id}
    title={data.title}
    children={data.content}
    creator={data.creator}
    side={data.side}
    createdAt={formatDate(data.createdAt * MILLISECONDS_TO_SECONDS)}
  />
);

const Motion = ({
  argumentations,
  params,
  title,
}) => (
  <Container>
    <Helmet title={title} />
    <BackButton link="/motions">Terug naar alle moties</BackButton>
    <MotionContainer motionId={params.motionId} />
    <Columns>
      {argumentations.length > 0 &&
        <div>
          <Heading variant="column" size="3">Voordelen</Heading>
          <List
            renderItem={renderArgument}
            items={argumentations.filter(a => a.side === 'pro')}
          />
        </div>
      }
      {argumentations.length > 0 &&
        <div>
          <Heading variant="column" size="3">Nadelen</Heading>
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

const stateToProps = (state, ownProps) => ({
  title: getMotionTitle(state, ownProps),
  argumentations: getArgs(state, ownProps),
});

export default connect(stateToProps)(Motion);
