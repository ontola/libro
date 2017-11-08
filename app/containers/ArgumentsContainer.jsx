import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getArgsPro, getArgsCon } from 'state/argumentations/selectors';

import {
  ArgumentListItem,
  Columns,
  List,
} from '../components';
import { Argument } from '../models/index';

const propTypes = {
  argsPro: PropTypes.arrayOf(Argument).isRequired,
  argsCon: PropTypes.arrayOf(Argument).isRequired,
};

const defaultProps = {
  argsPro: [],
  argsCon: [],
};

const renderItem = arg => (
  <ArgumentListItem
    key={arg.id}
    name={arg.name}
    side={arg.side}
    text={arg.text}
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

export default connect((state, ownProps) => ({
  argsPro: getArgsPro(state, ownProps),
  argsCon: getArgsCon(state, ownProps),
}))(ArgumentsContainer);
