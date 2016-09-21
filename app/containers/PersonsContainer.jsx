import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { List, ProfileListItem } from 'components';
import { fetchPersons } from 'state/persons/actions';
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
    key={person.id}
    link={path.profile(person.id)}
    image={person.image}
    name={person.name}
    description={person.party}
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
  dispatch => ({ loadPersons: () => { dispatch(fetchPersons()); } })
)(PersonsContainer);
