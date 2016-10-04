import { Detail } from 'components';
import path from 'helpers/paths';
import Person from 'models/Person';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPerson } from 'state/persons/actions';
import { getPerson } from 'state/persons/selectors';

const defaultRenderItem = (user) => (
  <Detail
    text={user.name}
    imageUrl={user.image}
    url={path.profile(user.id)}
  />
);

const propTypes = {
  full: PropTypes.bool,
  loadProfile: PropTypes.func,
  user: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Person),
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
    const { data, renderItem, full } = this.props;
    return data !== undefined && renderItem(data, full);
  }
}

PersonContainer.propTypes = propTypes;
PersonContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    data: getPerson(state, ownProps),
  }),
  (dispatch, ownProps) => ({
    loadProfile: () => dispatch(fetchPerson(ownProps.user)),
  })
)(PersonContainer);
