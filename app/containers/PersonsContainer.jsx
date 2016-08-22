
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, PoliticiansListItem } from 'components';
import Person from 'models/Person';

const propTypes = {
  persons: PropTypes.object,
  loadPersons: PropTypes.func.isRequired,
};

const defaultProps = {
  persons: {},
};

const renderItem = person => (
  <PoliticiansListItem
    key={person.id}
    id={person.id}
    image={person.image}
    name={person.name}
    party={person.party}
  />
);

class PersonsContainer extends Component {
  componentWillMount() {
    this.props.loadPersons();
  }

  render() {
    const { persons } = this.props;
    return <List items={persons} renderItem={renderItem} align="horizontal" />;
  }
}

PersonsContainer.defaultProps = defaultProps;
PersonsContainer.propTypes = propTypes;

export default connect(
  state => ({ persons: state.getIn(['persons', 'items']) }),
  dispatch => ({ loadPersons: () => { dispatch(Person.index()); } })
)(PersonsContainer);
