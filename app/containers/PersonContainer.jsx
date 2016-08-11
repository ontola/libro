// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getPerson, getPersonUrl } from 'state/persons/selectors';
import { ProfileCard } from 'components';
import Person from 'models/Person';

const defaultRenderItem = (data, url, full) => (
  <ProfileCard
    id={data.id}
    name={data.name}
    party={data.party}
    image={data.image}
    bio={data.biography}
    full={full}
  />
);

const propTypes = {
  full: PropTypes.bool,
  loadProfile: PropTypes.func,
  user: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Person),
  url: PropTypes.string,
  renderItem: PropTypes.func,
};

const defaultProps = {
  renderItem: defaultRenderItem,
};

class PersonContainer extends Component {
  componentWillMount() {
    const { data, loadProfile } = this.props;
    if (data === undefined) {
      loadProfile();
    }
  }

  render() {
    const { data, renderItem, full, url } = this.props;
    return data !== undefined && renderItem(data, url, full);
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
