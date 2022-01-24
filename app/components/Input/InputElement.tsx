import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import Textarea from 'react-autosize-textarea';

import TextEditor, { PlainEditorProps } from '../../containers/TextEditor';
import { SHADOW_LIGHT } from '../../helpers/flow';
import { LibroTheme } from '../../themes/themes';
import { FormContext, FormTheme } from '../Form/Form';
import {
  FormFieldContext,
  fieldInputCID,
  fieldInputCheckboxCID,
  fieldInputHiddenCID,
  fieldInputMarkdownCID,
  useFormStyles,
} from '../FormField/FormField';
import FormFieldTrailer from '../FormField/FormFieldTrailer';
import { InputComponentProps } from '../FormField/InputComponentProps';
import Input, {
  PropTypes as InputProps,
  InputType,
} from '../Input/Input';

interface StyleProps {
  invalid?: boolean;
  touched?: boolean;
}

export interface InputPropTypes extends InputComponentProps {
  trailer: (props: any) => any;
  type?: InputType;
}

type SharedInputProps = InputProps & Partial<PlainEditorProps> & Partial<Omit<Textarea.Props, keyof InputProps>>;

const TEXTFIELD_MIN_ROWS = 3;
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
  } = React.useContext(FormContext);
  const {
    autofocus,
    fieldShape,
    meta,
    name,
    onBlur,
    onFocus,
    placeholder,
    storeKey,
  } = React.useContext(FormFieldContext);

  const [focus, setFocus] = React.useState(autofocus);

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

  React.useEffect(() => {
    setFocus(autofocus || meta.active);
  }, [meta.active]);

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

  const sharedProps: SharedInputProps = {
    'data-testid': name,
    id: name,
    name,
    onBlur,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      let val;

      if (e && Object.prototype.hasOwnProperty.call(e, 'target')) {
        val = e.target.value;
      } else {
        val = e === null ? '' : e;
      }

      onChange(val);
    },
    onFocus,
    required,
    value: inputValue?.value,
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
        autoFocus={focus}
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
