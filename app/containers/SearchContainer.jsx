// @flow
import { connect } from 'react-redux';
import { SearchPage } from '../components';
import { toggleDrawer, setHitCount } from '../state/search/actions';

const mapStateToProps = (state) => ({
  hits: state.search.hits,
});

const mapDispatchToProps = (dispatch) => ({
  setHitCount: (count) => {
    dispatch(setHitCount(count));
  },
  toggleDrawer: () => {
    dispatch(toggleDrawer());
  },
});

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);

export default SearchContainer;
