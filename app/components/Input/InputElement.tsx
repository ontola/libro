import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import React from 'react';
import Textarea from 'react-autosize-textarea';

import TextEditor, { PlainEditorProps } from '../../containers/TextEditor';
import { SHADOW_LIGHT } from '../../helpers/flow';
import { FocusRelatedEventHandler, InputValue } from '../../hooks/useFormField';
import { ShapeForm } from '../../hooks/useShapeProps';
import { LibroTheme } from '../../themes/themes';
import { FormContext, FormTheme } from '../Form/Form';
import { FormFieldError, InputMeta } from '../FormField';
import FormFieldTrailer from '../FormField/FormFieldTrailer';
import Input, {
  InputAutocomplete,
  PropTypes as InputProps,
  InputType,
} from '../Input/Input';

interface StyleProps {
  invalid?: boolean;
  touched?: boolean;
}

const TEXTFIELD_MIN_ROWS = 3;

export interface InputPropTypes {
  autoComplete?: InputAutocomplete;
  autofocus: boolean;
  description?: string;
  errors?: FormFieldError[];
  field: SomeNode;
  fieldShape: ShapeForm;
  id: string;
  inputIndex: number;
  inputValue: InputValue;
  label?: string | React.ReactNode;
  meta: InputMeta;
  name: string;
  onBlur: FocusRelatedEventHandler;
  onChange: (props: any) => void;
  onFocus: FocusRelatedEventHandler
  path: SomeNode;
  placeholder?: string;
  required?: boolean;
  storeKey: string;
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
      // border: `2px solid ${theme.palette.primary.main}`,
      boxShadow: ({ invalid, touched }) =>
        `0px 0px 0px 2px ${(touched && invalid) ? theme.palette.error.main : theme.palette.primary.main}, ${SHADOW_LIGHT}`,
    },
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: SHADOW_LIGHT,
    padding: theme.spacing(FLOW_INPUT_PADDING),
  },
}));

const InputElement = (props: InputPropTypes): JSX.Element => {
  const {
    autoComplete,
    autofocus,
    fieldShape,
    inputValue,
    meta,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    storeKey,
    trailer: Trailer,
    type,
  } = props;
  const {
    onKeyUp,
    theme,
  } = React.useContext(FormContext);
  const {
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

  const className = clsx({
    'Field__input': true,
    [`Field__input--${type || 'text'}`]: true,
    'Field__input--active': active,
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
        val = type === 'checkbox' ? e.target.checked : e.target.value;
      } else {
        val = e === null ? '' : e;
      }

      onChange(val);
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

  case 'checkbox': {
    const currentValue = inputValue;
    sharedProps.checked = currentValue.value === 'true';
    break;
  }

  default:
    element = 'input';
  }

  return (
    <div className={className}>
      <Input
        {...sharedProps}
        autoComplete={autoComplete}
        element={element}
        // TODO: [AOD-218] HTML only noscript
        // maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        required={required}
        type={type}
        onKeyUp={onKeyUp}
      />
      {Trailer && <Trailer {...props} />}
    </div>
  );
};

InputElement.defaultProps = {
  trailer: FormFieldTrailer,
};

export default InputElement;
