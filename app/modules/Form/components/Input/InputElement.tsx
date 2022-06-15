import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import clsx from 'clsx';
import React from 'react';
import Textarea from 'react-autosize-textarea';

import { LibroTheme } from '../../../../themes/themes';
import { SHADOW_LIGHT } from '../../../Common/lib/flow';
import { FormTheme, formContext } from '../Form/FormContext';
import { formFieldContext } from '../FormField/FormFieldContext';
import FormFieldTrailer from '../FormField/FormFieldTrailer';
import { InputComponentProps } from '../FormField/FormFieldTypes';
import {
  fieldInputCID,
  fieldInputCheckboxCID,
  fieldInputHiddenCID,
  fieldInputMarkdownCID,
  useFormStyles,
} from '../FormField/UseFormStyles';
import TextEditor, { PlainEditorProps } from '../TextEditor';

import Input, { PropTypes as InputProps, InputType } from './Input';

interface StyleProps {
  invalid?: boolean;
  touched?: boolean;
}

const TEXTFIELD_MIN_ROWS = 3;

export interface InputPropTypes extends InputComponentProps {
  trailer: (props: any) => any;
  type?: InputType;
}

const FLOW_INPUT_PADDING = 4;

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  flowInput: {
    '& textarea': {
      height: '100px',
    },
    '&:focus-within': {
      boxShadow: ({ invalid, touched }) => {
        const color = (touched && invalid) ? theme.palette.error.main : theme.palette.primary.main;

        return `0px 0px 0px 2px ${color}, ${SHADOW_LIGHT}`;
      },
    },
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: SHADOW_LIGHT,
    padding: theme.spacing(FLOW_INPUT_PADDING),
  },
}));

const InputElement = ({
  errors,
  inputValue,
  onChange,
  trailer: Trailer,
  type,
}: InputPropTypes): JSX.Element => {
  const {
    onKeyUp,
    theme,
  } = React.useContext(formContext);
  const {
    autofocus,
    fieldShape,
    meta,
    name,
    onBlur,
    onFocus,
    placeholder,
    storeKey,
  } = React.useContext(formFieldContext);
  const {
    maxInclusive,
    minInclusive,
    minLength,
    required,
  } = fieldShape;
  const {
    active,
    invalid,
    touched,
  } = meta;

  const classes = useStyles({
    invalid,
    touched,
  });
  const formClasses = useFormStyles();

  const className = clsx({
    'Field__input--active': active,
    [formClasses.fieldInput]: true,
    [fieldInputCID]: true,
    [fieldInputCheckboxCID]: type === InputType.Checkbox,
    [fieldInputHiddenCID]: type === InputType.Hidden,
    [fieldInputMarkdownCID]: type === InputType.Markdown,
    [classes.flowInput]: theme === FormTheme.Flow,
  });

  const sharedProps: InputProps & Partial<PlainEditorProps> & Partial<Omit<Textarea.Props, keyof InputProps>> = {
    'autoFocus': autofocus,
    'data-testid': name,
    'id': name,
    name,
    onBlur,
    'onChange': (e: React.ChangeEvent<HTMLInputElement>) => {
      let val;

      if (e && Object.prototype.hasOwnProperty.call(e, 'target')) {
        val = e.target.value;
      } else {
        val = e === null ? '' : e;
      }

      onChange(rdf.literal(val));
    },
    onFocus,
    required,
    'value': inputValue?.value,
  };

  let element;

  switch (type) {
  case 'textarea':
    element = Textarea;
    sharedProps.async = true;
    sharedProps.rows = TEXTFIELD_MIN_ROWS;
    sharedProps.maxRows = 50;
    break;
  case 'markdown':
    element = TextEditor;
    sharedProps.id = storeKey;
    sharedProps.rows = TEXTFIELD_MIN_ROWS;
    break;

  default:
    element = 'input';
  }

  return (
    <div className={className}>
      <Input
        {...sharedProps}
        element={element}
        max={maxInclusive}
        // TODO: [AOD-218] HTML only noscript
        // maxLength={maxLength}
        min={minInclusive}
        minLength={minLength}
        placeholder={placeholder}
        required={required}
        type={type}
        onKeyUp={onKeyUp}
      />
      {Trailer && (
        <Trailer
          errors={errors}
          inputValue={inputValue}
        />
      )}
    </div>
  );
};

InputElement.defaultProps = {
  trailer: FormFieldTrailer,
};

export default InputElement;
