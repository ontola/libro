import HttpStatus from 'http-status-codes';
import PropTypes from 'prop-types';

export const shouldShowSignIn = (userType, status) => userType === 'GuestUser'
  && [HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN].includes(status);

export const propTypes = {
  caughtError: PropTypes.instanceOf(Error),
  error: PropTypes.instanceOf(Error),
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  reloadLinkedObject: PropTypes.func.isRequired,
  userType: PropTypes.oneOf(['GuestUser', 'ConfirmedUser', 'UnconfirmedUser']),
};
