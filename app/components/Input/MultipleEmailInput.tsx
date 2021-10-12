import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';
import { AutocompleteInputChangeReason } from '@material-ui/lab/useAutocomplete/useAutocomplete';
import { makeStyles } from '@material-ui/styles';
import rdf from '@ontologies/core';
import React from 'react';
import { useIntl } from 'react-intl';

import { ShapeForm } from '../../hooks/useShapeProps';
import { LibroTheme } from '../../themes/themes';
import { formMessages } from '../../translations/messages';
import { InputComponentProps } from '../FormField/InputComponentProps';

import HiddenRequiredInput from './HiddenRequiredInput';

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

enum EmailError {
  NO_ERROR,
  MAX_LENGTH,
  INVALID_EMAIL,
  MAX_EMAIL_COUNT,
}

interface ErrorMessageMap {
  [k: string]: (report: ValidationReport) => string;
}

type ErrorMessages = (fieldShape: ShapeForm) => ErrorMessageMap;

const matchMultiple = /\n|\s|,\s*/gm;

const multipleValueMapper = (val: string) => val.split(matchMultiple);

const filterUnique = (list: string[]) => Array.from(new Set(list));

interface ValidationResult {
  valid: string[];
  invalid: string[];
}

const indicativeName = (reason: AutocompleteChangeReason): boolean =>
  reason !== 'create-option' && reason !== 'blur';

const validateValues = (pattern: RegExp, emails: string[]): ValidationResult => {
  const flattenedValues = filterUnique(emails.flatMap(multipleValueMapper));
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

const containsInvalidEmail = (report: ValidationResult): boolean => report.invalid.length === 0;

const useErrorMessages: ErrorMessages = ({ maxCount, maxLength }) => {
  const intl = useIntl();

  return {
    [EmailError.NO_ERROR]: (_: NoErrorReport) => '',
    [EmailError.MAX_LENGTH]: (report: MaxLengthReport) => intl.formatMessage(
      formMessages.maxEmailLengthMessage,
      {
        length: report.errorData,
        maxLength,
      },
    ),
    [EmailError.INVALID_EMAIL]: () => intl.formatMessage(formMessages.invalidEmailMessage),
    [EmailError.MAX_EMAIL_COUNT]: (report: MaxEmailCountReport) => intl.formatMessage(
      formMessages.maxEmailCountMessage,
      {
        count: report.errorData,
        maxCount,
      },
    ),
  } as ErrorMessageMap;
};

interface ValidatorConfig {
  pattern: RegExp,
  maxCount: number,
  maxLength: number,
}

interface NoErrorReport {
  error: EmailError.NO_ERROR;
}

interface InvalidEmailReport {
  error: EmailError.INVALID_EMAIL;
  errorData: ValidationResult;
}

interface MaxEmailCountReport {
  error: EmailError.MAX_EMAIL_COUNT;
  errorData: number;
}

interface MaxLengthReport {
  error: EmailError.MAX_LENGTH;
  errorData: number;
}

type ValidationReport = NoErrorReport |
  InvalidEmailReport |
  MaxEmailCountReport |
  MaxLengthReport;

const patternToRegExp = (pattern: string): RegExp => new RegExp(pattern!.replace(/\s/g, ''), 'mu');

const validatorConfigFromShape = (fieldShape: ShapeForm): ValidatorConfig => {
  if (!fieldShape.pattern) {
    throw new Error('Shape has no pattern.');
  }

  return {
    maxCount: fieldShape.maxCount ?? Infinity,
    maxLength: fieldShape.maxLength ?? Infinity,
    pattern: patternToRegExp(fieldShape.pattern),
  };
};

const validateEmails = (
  validator: ValidatorConfig,
  emails: string[],
): ValidationReport => {
  const emailCount = emails.length;
  const inputLength = emails.reduce((acc, e) => acc + e.length, 0);
  const validationResult = validateValues(validator.pattern, emails);

  if (emailCount > validator.maxCount) {
    return {
      error: EmailError.MAX_EMAIL_COUNT,
      errorData: emails.length,
    };
  } else if (inputLength > validator.maxLength) {
    return {
      error: EmailError.MAX_LENGTH,
      errorData: inputLength,
    };
  } else if (containsInvalidEmail(validationResult)) {
    return {
      error: EmailError.INVALID_EMAIL,
      errorData: validationResult,
    };
  }

  return {
    error: EmailError.NO_ERROR,
  };
};

const validateInput = (
  validator: ValidatorConfig,
  textFieldValue: string,
): ValidationReport => {
  const indicatedDone = textFieldValue.endsWith(' ');
  const addedOption = textFieldValue.trim();

  if (indicatedDone && !validator.pattern.test(addedOption)) {
    return {
      error: EmailError.INVALID_EMAIL,
      errorData: {
        invalid: [addedOption],
        valid: [],
      },
    };
  }

  return {
    error: EmailError.NO_ERROR,
  };
};

const validate = (
  validator: ValidatorConfig,
  emails: string[],
  textFieldValue: string,
): ValidationReport => {
  const enteredEmails = validateEmails(validator, emails);
  const input = validateInput(validator, textFieldValue);

  if (input.error === EmailError.INVALID_EMAIL) {
    if (enteredEmails.error === EmailError.INVALID_EMAIL) {
      return {
        error: EmailError.INVALID_EMAIL,
        errorData: {
          invalid: input.errorData.invalid.concat(enteredEmails.errorData.invalid),
          valid: input.errorData.valid.concat(enteredEmails.errorData.valid),
        },
      };
    }

    return input;
  }

  return enteredEmails;
};

export const MultipleEmailInput = ({
  autofocus,
  name,
  onChange,
  placeholder,
  fieldShape,
  values,
}: InputComponentProps): JSX.Element => {
  const overrideClasses = useOverrideStyle();
  const classes = useStyles();
  const errorMessages = useErrorMessages(fieldShape);

  const [textFieldValue, setTextFieldValue] = React.useState<string>('');
  const [reason, setReason] = React.useState<AutocompleteChangeReason>('create-option');
  const [emails, setEmails] = React.useState<string[]>(values.map((v) => v?.value).filter(Boolean));

  const [validatorConfig] = React.useState(() => validatorConfigFromShape(fieldShape));
  const [report, setReport] = React.useState(() => validate(validatorConfig, emails, textFieldValue));

  const hasError = report.error !== EmailError.NO_ERROR;

  const handleInputChange = (
    e: React.ChangeEvent<unknown>,
    value: string,
    _: AutocompleteInputChangeReason,
  ) => {
    e.preventDefault();

    setTextFieldValue(value);
  };

  const handleChange = (
    e: React.ChangeEvent<unknown>,
    chips: string[],
    changeReason: AutocompleteChangeReason,
  ) => {
    e.preventDefault();

    setReason(changeReason);
    setEmails(chips);
  };

  React.useEffect(() => {
    const nextReport = validate(validatorConfig, emails, textFieldValue);

    setReport(nextReport);
  }, [validatorConfig, emails]);

  React.useEffect(() => {
    // TODO: Something with reason and indicativeName

    switch (report.error) {
    case EmailError.MAX_EMAIL_COUNT:
    case EmailError.MAX_LENGTH:
      // Don't update emails
      break;

    case EmailError.NO_ERROR:
      if (textFieldValue.length > 0) {
        setEmails([...emails, textFieldValue]);
        setTextFieldValue('');
      }

      break;

    case EmailError.INVALID_EMAIL:
      // TODO: debouncedRegTester(trimmed);

      setEmails(report.errorData.valid);
      // HACK: Autocomplete clears textinput value on change without a way to disable it.
      //   Wrapping the setState in a timeout fixes this.
      setTimeout(() => {
        setTextFieldValue(report.errorData.invalid.join(','));
      });
      break;
    }
  }, [report]);

  React.useEffect(() => {
    if (report.error === EmailError.NO_ERROR) {
      onChange(emails.map((v) => rdf.literal(v)));
    }
  }, [emails, report]);

  // RENDER

  const renderErrorMessage = () => {
    const test = errorMessages[report.error];

    return (
      <span className={classes.errorMessage}>
        {test(report)}
      </span>
    );
  };

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
        onChange={handleChange}
        onInputChange={handleInputChange}
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
