import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getArgsCon, getArgsPro } from 'state/argumentations/selectors';

import {
  ArgumentListItem,
  Columns,
  List,
} from '../components';
import { Argument } from '../models/index';

const propTypes = {
  argsCon: PropTypes.arrayOf(Argument).isRequired,
  argsPro: PropTypes.arrayOf(Argument).isRequired,
};

const defaultProps = {
  argsCon: [],
  argsPro: [],
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
  argsCon: getArgsCon(state, ownProps),
  argsPro: getArgsPro(state, ownProps),
}))(ArgumentsContainer);
