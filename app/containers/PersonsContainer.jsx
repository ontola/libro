// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { PoliticiansListItem } from '../components';
import { getPersons } from '../reducers/persons';
import Person from '../models/Person';

const propTypes = {
  persons: PropTypes.object,
  loadPersons: PropTypes.func.isRequired,
};

const defaultProps = {
  persons: {},
};

class PersonsContainer extends Component {
  componentWillMount() {
    this.props.loadPersons();
  }

  render() {
    const { persons } = this.props;
    return (
      <div>
        {persons.map(person => <PoliticiansListItem key={person.id} data={person} />)}
      </div>
    );
  }
}

PersonsContainer.defaultProps = defaultProps;
PersonsContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  persons: getPersons(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadPersons: () => {
    dispatch(Person.index());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonsContainer);
