import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import rdf from '@ontologies/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDebouncedCallback } from 'use-debounce';

import { ShapeForm } from '../../hooks/useShapeProps';
import { LibroTheme } from '../../themes/themes';
import { formMessages } from '../../translations/messages';
import { InputComponentProps } from '../FormField/InputComponentProps';

import HiddenRequiredInput from './HiddenRequiredInput';

enum EmailValidationState {
  NO_ERROR = 0,
  MAX_LENGTH,
  INVALID_EMAIL,
  MAX_EMAIL_COUNT,
}

type ErrorMessages = (fieldShape: ShapeForm) => Record<EmailValidationState, (current: number) => string>;

interface ValidationResult {
  valid: string[];
  invalid: string[];
}

interface ValidationState {
  validationState: EmailValidationState,
  errorData: number,
}

interface FieldShapeRules {
  maxCount: number,
  maxLength: number,
}

type FieldShapeValidation = [validationResult: ValidationState | null, shoudlPushUpdate: boolean];

type HandleNewValueFunctionShape = (newValues: string[], pattern: RegExp, reason?: AutocompleteChangeReason) => void;

const REGEX_TEST_DEBOUNCE_TIME = 1000;

const useOverrideStyle = makeStyles({
  inputFocused: {
    border: 'none',
  },
  inputRoot: {
    '& textarea:first-of-type': {
      minWidth: 'min(100%, 30ch) !important',
    },
  },
  tag: {
    maxWidth: 'min(80vw, 60ch)',
  },
});

const useStyles = makeStyles<LibroTheme>((theme) => ({
  errorMessage: {
    color: theme.palette.error.main,
  },
}));

const matchMultiple = /\n|\s|,\s*/gm;
const multipleValueMapper = (val: string) => val.split(matchMultiple);

const patternToRegExp = (pattern: string | undefined) => {
  if (!pattern) {
    throw new Error('Pattern is require in fieldShape');
  }

  return new RegExp(pattern.replace(/\s/g, ''), 'mu');
};

const filterUnique = (list: string[]) => Array.from(new Set(list));

const shouldNotValidate = (reason: AutocompleteChangeReason): boolean =>
  reason !== 'create-option' && reason !== 'blur';

const shouldUpdateTextInputValue = (validationState: EmailValidationState) =>
  validationState === EmailValidationState.MAX_LENGTH || validationState === EmailValidationState.MAX_EMAIL_COUNT;

const validateValues = (values: string[], pattern: RegExp): ValidationResult => {
  const flattenedValues = filterUnique(values.flatMap(multipleValueMapper));
  const results: ValidationResult = {
    invalid: [],
    valid: [],
  };

  for (const value of flattenedValues) {
    const isValid = pattern.test(value);

    if (isValid) {
      results.valid.push(value);
    } else {
      results.invalid.push(value);
    }
  }

  return results;
};

const createHandleNewValue = (
  setEmails: React.Dispatch<React.SetStateAction<string[]>>,
  setTextFieldValue: React.Dispatch<React.SetStateAction<string>>,
  setValidationState: React.Dispatch<React.SetStateAction<ValidationState>>,
): HandleNewValueFunctionShape =>
  (
    newValues: string[],
    pattern: RegExp,
    reason: AutocompleteChangeReason = 'create-option',
  ) => {
    if (shouldNotValidate(reason)) {
      setEmails(newValues);

      return;
    }

    const results = validateValues(newValues, pattern);

    setEmails(results.valid);

    // HACK: Autocomplete clears textinput value on change without a way to disable it.
    //       Wrapping the setState in a timeout fixes this.
    setTimeout(() => {
      setTextFieldValue(results.invalid.join(','));

      if (results.invalid.length > 0) {
        setValidationState({
          errorData: 0,
          validationState: EmailValidationState.INVALID_EMAIL,
        });
      }
    }, 0);
  };

const createFieldShapeRules = (fieldShape: ShapeForm): FieldShapeRules => ({
  maxCount: fieldShape.maxCount ?? Infinity,
  maxLength: fieldShape.maxLength ?? Infinity,
});

const validateAgainstFieldShape = (values: string[], fieldShape: ShapeForm): FieldShapeValidation => {
  const { maxCount, maxLength } = createFieldShapeRules(fieldShape);

  if (values.length > maxCount) {
    return [{
      errorData: values.length,
      validationState: EmailValidationState.MAX_EMAIL_COUNT,
    }, false];
  }

  const totalLength = values.reduce((acc, e) => acc + e.length, 0);

  if (totalLength > maxLength) {
    return [{
      errorData: totalLength,
      validationState: EmailValidationState.MAX_LENGTH,
    }, false];
  }

  return [null, true];
};

const createValidateAndUpdateTextField = (
  handleNewValue: HandleNewValueFunctionShape,
  setTextFieldValue: React.Dispatch<React.SetStateAction<string>>,
  setValidationState: React.Dispatch<React.SetStateAction<ValidationState>>,
  debouncedRegTester: (val: string) => void,
) =>
  (
    textFieldValue: string,
    validationState: EmailValidationState,
    pattern: RegExp,
    emails: string[],
  ) => {
    if (textFieldValue === '') {
      return;
    }

    if (shouldUpdateTextInputValue(validationState)) {
      return;
    }

    const trimmed = textFieldValue.trim();

    if (textFieldValue.endsWith(' ')) {
      if (pattern.test(trimmed)) {
        handleNewValue([...emails, trimmed], pattern);
        setTextFieldValue('');

        return;
      }

      setTextFieldValue(trimmed);
      setValidationState({
        errorData: 0,
        validationState: EmailValidationState.INVALID_EMAIL,
      });
    }

    if (validationState === EmailValidationState.INVALID_EMAIL) {
      debouncedRegTester(trimmed);
    }
  };

const useErrorMessages: ErrorMessages = ({ maxCount, maxLength }) => {
  const intl = useIntl();

  return {
    [EmailValidationState.NO_ERROR]: () => '',
    [EmailValidationState.MAX_LENGTH]: (length: number) => intl.formatMessage(formMessages.maxEmailLengthMessage, {
      length,
      maxLength,
    }),
    [EmailValidationState.INVALID_EMAIL]: () => intl.formatMessage(formMessages.invalidEmailMessage),
    [EmailValidationState.MAX_EMAIL_COUNT]: (count: number) => intl.formatMessage(formMessages.maxEmailCountMessage, {
      count,
      maxCount,
    }),
  };
};

export const MultipleEmailInput = ({
  autofocus,
  name,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  fieldShape,
  values,
}: InputComponentProps): JSX.Element => {
  const { pattern } = fieldShape;
  const reg = patternToRegExp(pattern);

  const [emails, setEmails] = React.useState<string[]>(values.map((v) => v?.value).filter(Boolean));
  const [textFieldValue, setTextFieldValue] = React.useState<string>('');

  const [{ validationState, errorData }, setValidationState] = React.useState<ValidationState>({
    errorData: 0,
    validationState: EmailValidationState.NO_ERROR,
  });

  const [debouncedRegTester] = useDebouncedCallback((val: string) => {
    if (reg.test(val)) {
      setValidationState({
        errorData: 0,
        validationState: EmailValidationState.NO_ERROR,
      });
    }
  }, REGEX_TEST_DEBOUNCE_TIME);

  const handleNewValue = React.useMemo(() => createHandleNewValue(setEmails, setTextFieldValue, setValidationState), []);
  const validateAndUpdateTextField = React.useMemo(() => createValidateAndUpdateTextField(
    handleNewValue,
    setTextFieldValue,
    setValidationState,
    debouncedRegTester,
  ), []);

  const overrideClasses = useOverrideStyle();
  const classes = useStyles();
  const errorMessages = useErrorMessages(fieldShape);

  React.useEffect(() => {
    const [result, shouldPushChanges] = validateAgainstFieldShape(emails, fieldShape);

    result && setValidationState(result);
    shouldPushChanges && onChange(emails.map((v) => rdf.literal(v)));
  }, [emails]);

  React.useEffect(() => {
    validateAndUpdateTextField(
      textFieldValue,
      validationState,
      reg,
      emails,
    );
  }, [textFieldValue]);

  const handleChange = (e: React.ChangeEvent<unknown>, chips: string[], reason: AutocompleteChangeReason) => {
    e.preventDefault();
    handleNewValue(chips, reg, reason);
  };

  const handleTextFieldChange = (_: React.ChangeEvent<unknown>, val: string) => {
    if (shouldUpdateTextInputValue(validationState)) {
      return;
    }

    setTextFieldValue(val);
  };

  const renderErrorMessage = () => (
    <span className={classes.errorMessage}>
      {errorMessages[validationState](errorData)}
    </span>
  );

  const hasError = validationState !== EmailValidationState.NO_ERROR;

  return (
    <React.Fragment>
      <Autocomplete
        autoSelect
        freeSolo
        multiple
        ChipProps={{ color: 'primary' }}
        classes={overrideClasses}
        inputValue={textFieldValue}
        limitTags={10}
        open={false}
        options={['']}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            multiline
            InputProps={{
              ...params.InputProps,
              type: 'email',
            }}
            autoFocus={autofocus}
            error={hasError}
            margin="none"
            name={name}
            placeholder={emails.length > 0 ? '' : placeholder}
            variant="outlined"
          />
        )}
        value={emails}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
        onInputChange={handleTextFieldChange}
      />
      {fieldShape?.required && (
        <HiddenRequiredInput
          name={name}
          value={emails[0]}
        />
      )}
      {hasError ? renderErrorMessage() : null}
    </React.Fragment>
  );
};
