// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ProfileCard } from '../components';
import Person from '../models/Person';

const propTypes = {
  full: PropTypes.bool,
  loadProfile: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Person),
};

class ProfileCardContainer extends Component {
  componentWillMount() {
    this.props.loadProfile();
  }

  render() {
    return <ProfileCard data={this.props.data} full={this.props.full} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const findPerson = state.getIn(['persons', 'items', ownProps.user]);
  return {
    data: findPerson,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadProfile: () => dispatch(Person.fetch(ownProps.user)),
});

ProfileCardContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCardContainer);
