// @flow
import { connect } from 'react-redux';
import { PoliticiansList } from '../components';

const mapStateToProps = (state) => ({
  persons: state.entities.person,
});

const mapDispatchToProps = (dispatch) => ({
  actions: dispatch(getPersons()),
});

const PoliticiansContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoliticiansList);

export default PoliticiansContainer;
