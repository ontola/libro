// @flow
import { connect } from 'react-redux';
import { PoliticiansList } from '../components';
import { apiGetPersons } from '../actions/persons';

const mapStateToProps = (state) => ({
  data: state.persons.items,
  loading: state.persons.loading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: dispatch(apiGetPersons()),
});

const PoliticiansContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoliticiansList);

export default PoliticiansContainer;
