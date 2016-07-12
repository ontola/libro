// @flow
import { connect } from 'react-redux';
import { ProfileCard } from '../components';
import { apiGetPersons } from '../actions/persons';

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
  actions: dispatch(apiGetPersons(ownProps.user)),
});

const ProfileCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCard);

export default ProfileCardContainer;
