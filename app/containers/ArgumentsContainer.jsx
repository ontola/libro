import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getArgsPro, getArgsCon } from 'state/argumentations/selectors';
import {
  ArgumentListItem,
  Columns,
  List,
} from 'components';

const propTypes = {
  argsPro: PropTypes.array.isRequired,
  argsCon: PropTypes.array.isRequired,
};

const defaultProps = {
  argsPro: [],
  argsCon: [],
};

const renderItem = arg => (
  <ArgumentListItem
    key={arg.id}
    title={arg.title}
    content={arg.content}
    side={arg.side}
  />
);

const ArgumentsContainer = ({ argsPro, argsCon }) => (
  <Columns>
    {argsPro.length > 0 && <List items={argsPro} renderItem={renderItem} />}
    {argsCon.length > 0 && <List items={argsCon} renderItem={renderItem} />}
  </Columns>
);

ArgumentsContainer.propTypes = propTypes;
ArgumentsContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    argsPro: getArgsPro(state, ownProps),
    argsCon: getArgsCon(state, ownProps),
  })
)(ArgumentsContainer);
