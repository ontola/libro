// @flow
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ProfileCard } from '../components';
import { getPersons } from '../actions/entities';

const propTypes = {
  user: PropTypes.number.isRequired,
  full: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  const findPerson =
    state.persons.items &&
    state.persons.items.find(person => person.id === Number(ownProps.user));

  return {
    data: findPerson,
    loading: state.persons.loading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: dispatch(getPersons(ownProps.user)),
});

const ProfileCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCard);

ProfileCardContainer.PropTypes = propTypes;

export default ProfileCardContainer;
