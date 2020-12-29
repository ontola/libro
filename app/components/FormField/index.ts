import PropTypes from 'prop-types';

export const formFieldError = PropTypes.shape({
  error: PropTypes.string.isRequired,
  index: PropTypes.number,
});

export interface FormFieldError {
  index?: number;
  error: string;
}
export interface SubmissionErrors {
  [key: string]: FormFieldError[];
}

export interface InputMeta {
  active?: boolean;
  dirty?: boolean;
  dirtySinceLastSubmit?: boolean;
  error?: FormFieldError[];
  invalid?: boolean;
  pristine?: boolean;
  touched?: boolean;
}