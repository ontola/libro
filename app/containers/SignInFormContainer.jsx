import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { SignInFormCard, SignInFormCardRow } from '../components/SignInForm';
import { convertKeysAtoB } from '../helpers/data';
import { apiLogin } from '../middleware/api';
import argu from '../ontology/argu';
import {
  getCurrentUserEmail,
  getCurrentUserType,
} from '../state/app/selectors';
import { stepBack } from '../state/form/actions';
import {
  signInGetErrors,
  signInGetStep,
  signInHasBack,
} from '../state/form/selectors';

const mapStateToProps = (state, props) => ({
  errors: signInGetErrors(state),
  form: 'signIn',
  hasBack: signInHasBack(state),
  initialValues: {
    r: props.r,
  },
  registeredEmail: getCurrentUserEmail(state),
  step: signInGetStep(state),
  userType: getCurrentUserType(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (values) => dispatch(apiLogin({
    [argu.redirectUrl.value]: ownProps.r,
    ...convertKeysAtoB(values),
  })),
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
