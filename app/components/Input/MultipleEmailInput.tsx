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

enum EmailError {
  NO_ERROR = 0,
  MAX_LENGTH,
  INVALID_EMAIL,
  MAX_EMAIL_COUNT,
}

type ErrorMessages = (fieldShape: ShapeForm) => Record<EmailError, (current: number) => string>;

const matchMultiple = /\n|\s|,\s*/gm;
const multipleValueMapper = (val: string) => val.split(matchMultiple);

const filterUnique = (list: string[]) => Array.from(new Set(list));

const useErrorMessages: ErrorMessages = ({ maxCount, maxLength }) => {
  const intl = useIntl();

  return {
    [EmailError.NO_ERROR]: () => '',
    [EmailError.MAX_LENGTH]: (length: number) => intl.formatMessage(formMessages.maxEmailLengthMessage, {
      length,
      maxLength,
    }),
    [EmailError.INVALID_EMAIL]: () => intl.formatMessage(formMessages.invalidEmailMessage),
    [EmailError.MAX_EMAIL_COUNT]: (count: number) => intl.formatMessage(formMessages.maxEmailCountMessage, {
      count,
      maxCount,
    }),
  };
};

export const MultipleEmailInput = ({
  autofocus,
  name,
  onChange,
  placeholder,
  fieldShape,
  values,
}: InputComponentProps): JSX.Element => {
  const { pattern } = fieldShape;
  const reg = new RegExp(pattern!.replace(/\s/g, ''), 'mu');

  const [emails, setEmails] = React.useState<string[]>(values.map((v) => v?.value).filter(Boolean));
  const [textFieldValue, setTextFieldValue] = React.useState<string>('');

  const [{ error, errorData }, setError] = React.useState({
    error: EmailError.NO_ERROR,
    errorData: 0,
  });

  const [debouncedRegTester] = useDebouncedCallback((val: string) => {
    if (reg.test(val)) {
      setError({
        error: EmailError.NO_ERROR,
        errorData: 0,
      });
    }
  }, REGEX_TEST_DEBOUNCE_TIME);

  const overrideClasses = useOverrideStyle();
  const classes = useStyles();
  const errorMessages = useErrorMessages(fieldShape);

  React.useEffect(() => {
    if (emails.length > (fieldShape?.maxCount ?? Infinity)) {
      setError({
        error: EmailError.MAX_EMAIL_COUNT,
        errorData: emails.length,
      });

      return;
    }

    const totalLength = emails.join('').length;

    if (totalLength > (fieldShape.maxLength ?? Infinity)) {
      setError({
        error: EmailError.MAX_LENGTH,
        errorData: totalLength,
      });

      return;
    }

    setError({
      error: EmailError.NO_ERROR,
      errorData: 0,
    });

    onChange(emails.map((v) => rdf.literal(v)));
  }, [emails]);

  const handleNewValue = (newValues: string[], reason: AutocompleteChangeReason = 'create-option') => {
    if (reason !== 'create-option' && reason !== 'blur') {
      setEmails(newValues);

      return;
    }

    const flattenedValues = filterUnique(newValues.flatMap(multipleValueMapper));
    const results = flattenedValues.reduce<{ invalid: string[], valid: string[] }>((acc, current) => {
      const isValid = reg.test(current);

      return {
        ...acc,
        ...(isValid ? {
          valid: [...acc.valid, current],
        } : {
          invalid: [...acc.invalid, current],
        }),
      };
    }, {
      invalid: [],
      valid: [],
    });

    setEmails(results.valid);

    // HACK: Autocomplete clears textinput value on change without a way to disable it. Wrapping the setState in a timeout fixes this.
    setTimeout(() => {
      setTextFieldValue(results.invalid.join(','));

      if (results.invalid.length > 0) {
        setError({
          error: EmailError.INVALID_EMAIL,
          errorData: 0,
        });
      }
    }, 0);
  };

  const handleChange = (e: React.ChangeEvent<unknown>, chips: string[], reason: AutocompleteChangeReason) => {
    e.preventDefault();
    handleNewValue(chips, reason);
  };

  const handleTextFieldChange = (_: React.ChangeEvent<unknown>, val: string) => {
    if (error === EmailError.MAX_LENGTH || error === EmailError.MAX_EMAIL_COUNT) {
      return;
    }

    const trimmed = val.trim();

    if (val.endsWith(' ')) {
      if (reg.test(trimmed)) {
        handleNewValue([...emails, trimmed]);
        setTextFieldValue('');

        return;
      }

      setError({
        error: EmailError.INVALID_EMAIL,
        errorData: 0,
      });
    }

    if (error === EmailError.INVALID_EMAIL) {
      debouncedRegTester(trimmed);
    }

    setTextFieldValue(trimmed);
  };

  const renderErrorMessage = () => (
    <span className={classes.errorMessage}>
      {errorMessages[error](errorData)}
    </span>
  );

  const hasError = error !== EmailError.NO_ERROR;

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
