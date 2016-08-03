// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  ArgumentListItem,
  Columns,
  List,
} from '../components';

const propTypes = {
  motionId: PropTypes.string.isRequired,
  argumentations: PropTypes.array.isRequired,
};

const defaultProps = {
  argumentations: [],
};

const renderItem = (arg) => (
  <ArgumentListItem key={arg.id} data={arg} />
);

const ArgumentsContainer = ({ argumentations }) => {
  const argumentsPro = argumentations.filter(arg => arg.side === 'pro');
  const argumentsCon = argumentations.filter(arg => arg.side === 'con');

  return (
    <Columns>
      <List items={argumentsPro} renderItem={renderItem} />
      <List items={argumentsCon} renderItem={renderItem} />
    </Columns>
  );
};

const mapStateToProps = (state, ownProps) => {
  const findMotion = state.getIn(['motions', 'items', ownProps.motionId]);
  const findArguments = findMotion.arguments &&
    findMotion.arguments.map(id => state.getIn(['argumentations', 'items', id]));

  return {
    argumentations: findArguments,
  };
};

ArgumentsContainer.propTypes = propTypes;
ArgumentsContainer.defaultProps = defaultProps;

export default connect(
  mapStateToProps
)(ArgumentsContainer);
