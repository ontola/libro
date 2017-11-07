import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { List, ProfileListItem } from '../components';
import { fetchPersons } from 'state/persons/actions';
import { getPersons } from 'state/persons/selectors';
import path from 'helpers/paths';

const propTypes = {
  persons: PropTypes.object,
  loadPersons: PropTypes.func.isRequired,
};

const defaultProps = {
  persons: {},
};

const renderItem = person => (
  <ProfileListItem
    description={person.party}
    image={person.image}
    key={person.id}
    link={path.profile(person.id)}
    name={person.name}
  />
);

class PersonsContainer extends Component {
  componentWillMount() {
    this.props.loadPersons();
  }

  render() {
    const { persons } = this.props;
    return <List align="horizontal" items={persons} renderItem={renderItem} />;
  }
}

PersonsContainer.defaultProps = defaultProps;
PersonsContainer.propTypes = propTypes;

export default connect(
  state => ({ persons: getPersons(state) }),
  dispatch => ({ loadPersons: () => dispatch(fetchPersons()) })
)(PersonsContainer);
