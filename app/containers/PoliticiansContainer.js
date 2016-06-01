import { connect } from 'react-redux';
import { PoliticiansList } from '../components';
import { fetchPoliticians } from '../actions';
import { dataPoliticians } from '../data';

const mapStateToProps = (state) => {
  return {
    data: state.politicians
  };
};

const mapDispatchToProps = (dispatch) => {
  return dispatch(fetchPoliticians(dataPoliticians));
};

const PoliticiansContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoliticiansList);

export default PoliticiansContainer;
