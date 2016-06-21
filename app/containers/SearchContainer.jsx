// @flow
import React from 'react';
import { connect } from 'react-redux';
import { SearchPage } from '../components';
import { toggleDrawer, setHitCount } from '../actions/search';

const mapStateToProps = (state) => {
  return {
    hits: state.search.hits,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
		setHitCount: (count) => {
			dispatch(setHitCount(count));
		},
    toggleDrawer: () => {
      dispatch(toggleDrawer());
    }
  }
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);

export default SearchContainer;
