import { injectIntl } from 'react-intl';
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
  onSubmit: values => dispatch(apiLogin({ r: ownProps.r, ...convertKeysAtoB(values) })),
  stepBack: () => dispatch(stepBack()),
});

const SignInFormContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInFormCard));

export const SignInFormContainerCardRow = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SignInFormCardRow)));

export default SignInFormContainer;
