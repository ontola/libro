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
