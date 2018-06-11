import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import {
  SignInFormCard,
  SignInFormCardRow,
} from '../components';
import { convertKeysAtoB } from '../helpers/data';
import { apiLogin } from '../middleware/api';
import {
  getCurrentUserEmail,
  getCurrentUserType,
} from '../state/app/selectors';
import { stepBack } from '../state/form/actions';
import {
  signInGetStep,
  signInHasBack,
} from '../state/form/selectors';

const mapStateToProps = (state, props) => ({
  form: 'signIn',
  hasBack: signInHasBack(state),
  initialValues: {
    r: props.redirect,
  },
  registeredEmail: getCurrentUserEmail(state),
  step: signInGetStep(state),
  userType: getCurrentUserType(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(apiLogin(convertKeysAtoB(values))),
  stepBack: () => dispatch(stepBack()),
});

const SignInFormContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInFormCard));

export const SignInFormContainerCardRow = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInFormCardRow));

export default SignInFormContainer;
