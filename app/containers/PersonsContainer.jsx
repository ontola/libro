// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, PoliticiansListItem } from '../components';
import Person from '../models/Person';

const propTypes = {
  persons: PropTypes.array,
  loadPersons: PropTypes.func.isRequired,
};

const defaultProps = {
  persons: [],
};

class PersonsContainer extends Component {
  componentDidMount() {
    this.props.loadPersons();
  }

  renderItem(person) {
    return (
      <PoliticiansListItem
        key={person.id}
        data={person}
      />
    );
  }

  render() {
    const { persons } = this.props;
    return <List align="horizontal" renderItem={this.renderItem} items={persons} />;
  }
}

PersonsContainer.defaultProps = defaultProps;
PersonsContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  persons: state.getIn(['persons', 'items']).toArray(),
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
