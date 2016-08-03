// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getPerson, getPersonUrl } from '../reducers/persons';
import { ProfileCard } from '../components';
import Person from '../models/Person';

const defaultRenderItem = (data, url, full) => (
  <ProfileCard
    data={data}
    full={full}
  />
);

const propTypes = {
  full: PropTypes.bool,
  loadProfile: PropTypes.func.isRequired,
  user: PropTypes.string,
  data: PropTypes.instanceOf(Person),
  url: PropTypes.string,
  renderItem: PropTypes.func,
};

const defaultProps = {
  renderItem: defaultRenderItem,
};

class PersonContainer extends Component {
  componentWillMount() {
    this.props.loadProfile();
  }

  render() {
    const { data, renderItem, full, url } = this.props;
    return this.props.user && renderItem(data, url, full);
  }
}

PersonContainer.propTypes = propTypes;
PersonContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    data: getPerson(state, ownProps),
    url: getPersonUrl(state, ownProps),
  }),
  (dispatch, ownProps) => ({
    loadProfile: () => dispatch(Person.fetch(ownProps.user)),
  })
)(PersonContainer);
