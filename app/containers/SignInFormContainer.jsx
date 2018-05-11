import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';

import {
  SignInFormCard,
  SignInFormCardRow,
} from '../components';
import { apiLogin } from '../middleware/api';
import {
  getCurrentUserEmail,
  getCurrentUserType,
} from '../state/app/selectors';
import { stepBack } from '../state/form/actions';
import { STEPS } from '../state/form/reducer';
import {
  signInGetStep,
  signInHasBack,
} from '../state/form/selectors';

const mapStateToProps = (state, props) => {
  const userType = getCurrentUserType(state);
  return {
    form: 'signIn',
    hasBack: signInHasBack(state),
    initialValues: {
      r: props.redirect,
    },
    registeredEmail: getCurrentUserEmail(state),
    step: userType === 'GuestUser' ? signInGetStep(state) : STEPS.signUpCompleted,
    userType: getCurrentUserType(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(apiLogin(values.toJS())),
  stepBack: () => dispatch(stepBack()),
});

const SignInFormContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({})(SignInFormCard)));

export const SignInFormContainerCardRow = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({})(SignInFormCardRow)));

export default SignInFormContainer;
