import PropTypes from 'prop-types';

export const formFieldError = PropTypes.shape({
  error: PropTypes.string.isRequired,
  index: PropTypes.number,
});
