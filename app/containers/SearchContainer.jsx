// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Search } from '../views';
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
)(Search);

export default SearchContainer
