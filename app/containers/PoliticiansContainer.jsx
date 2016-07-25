// @flow
import React from 'react';
import { connect } from 'react-redux';
import { List, PoliticiansListItem } from '../components';
import { Person } from '../models';

const getPersons = new Person().index();
const renderPerson = (person) => (
  <PoliticiansListItem
    key={person.id}
    data={person}
  />
);

const mapStateToProps = (state) => ({
  list: state.getIn(['persons', 'items']).toArray(),
  renderItem: renderPerson,
  align: 'horizontal',
});

const mapDispatchToProps = (dispatch) => ({
  actions: dispatch(getPersons),
});

const PoliticiansContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export default PoliticiansContainer;
