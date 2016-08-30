
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  ArgumentShow,
  Columns,
  Container,
  Heading,
  List,
} from 'components';

import { getMotionTitle } from 'state/motions/selectors';
import { getArgs } from 'state/argumentations/selectors';
import { getErrorBool } from 'state/communication/selectors';
import MotionContainer from 'containers/MotionContainer';

const propTypes = {
  argumentations: PropTypes.array,
  error: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    motionId: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
};

const defaultProps = {
  argumentations: [],
  error: false,
};

const renderArgument = (data) => (
  <ArgumentShow
    key={data.id}
    title={data.title}
    content={data.content}
    creator={data.creator}
    side={data.side}
    createdAt={data.createdAt}
  />
);

const Motion = ({
  argumentations,
  error,
  params,
  title,
}) => (
  <Container>
    <Helmet title={title} />
    {error && <div>Pagina kan niet geladen worden...</div>}
    {!error && <MotionContainer motionId={params.motionId} />}
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
  error: getErrorBool(state),
});

export default connect(stateToProps)(Motion);
