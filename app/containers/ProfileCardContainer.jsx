// @flow
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ProfileCard } from '../components';
import { Person } from '../models';

const propTypes = {
  user: PropTypes.number.isRequired,
  full: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  const findPerson = state.getIn(['persons', 'items', ownProps.user]);
  return {
    data: findPerson && findPerson.toObject(),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const getPerson = new Person().set('id', ownProps.user).fetch();
  return {
    actions: dispatch(getPerson),
  };
};

const ProfileCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCard);

ProfileCardContainer.PropTypes = propTypes;

export default ProfileCardContainer;
