import { connect } from 'react-redux';

import { SearchPage } from 'components';
import { getSearchHits } from 'state/searchElastic/selectors';
import { toggleDrawer, setHitCount } from 'state/searchElastic/actions';

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
