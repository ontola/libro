import { connect } from 'react-redux';

import { getSearchHits } from 'state/searchElastic/selectors';
import { setHitCount, toggleDrawer } from 'state/searchElastic/actions';

import { SearchPage } from '../components';

const mapStateToProps = state => ({
  hits: getSearchHits(state),
});

const mapDispatchToProps = dispatch => ({
  setHitCount: count => dispatch(setHitCount(count)),
  toggleDrawer: () => dispatch(toggleDrawer()),
});

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);

export default SearchContainer;
