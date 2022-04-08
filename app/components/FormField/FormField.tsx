import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import React, { FunctionComponent } from 'react';

import { calculateFormFieldName } from '../../helpers/forms';
import { PermittedFormField } from '../../hooks/useFormField';
import { LibroTheme } from '../../themes/themes';
import { fieldLabelCID } from '../FieldLabel';
import ResourceBoundary from '../ResourceBoundary';

import FormFieldDescription from './FormFieldDescription';
import FormFieldLabel from './FormFieldLabel';
import FormInputs from './FormInputs';
import { InputComponentProps } from './InputComponentProps';

export const fieldActiveCID = 'CID-FieldActive';
export const fieldInputCID = 'CID-FieldInput';
export const fieldInputCheckboxCID = 'CID-FieldInputCheckbox';
export const fieldInputHiddenCID = 'CID-FieldInputHidden';
export const fieldInputMarkdownCID = 'CID-FieldInputMarkdown';
export const fieldInputSelectCID = 'CID-FieldInputSelect';
export const fieldVariantPreviewCID = 'CID-FieldVariantPreview';

export interface CombinedFormFieldProps extends PermittedFormField {
  combinedComponent: true;
  inputComponent: FunctionComponent;
}
export interface SingularFormFieldProps extends PermittedFormField {
  combinedComponent: false | undefined;
  inputComponent: FunctionComponent<InputComponentProps>;
}
export type FormFieldProps = CombinedFormFieldProps | SingularFormFieldProps;

export type FormFieldContext = Omit<FormFieldProps, 'className' | 'combinedComponent' | 'whitelisted' >;

export const FormFieldContext = React.createContext<FormFieldContext>(undefined as any);

export const useFormStyles = makeStyles<LibroTheme>((theme) => ({
  field: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  fieldInput: {
    // https://gitlab.com/ontola/core/-/issues/292
    [`& [id='${calculateFormFieldName(schema.name)}']`]: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
    },
    '& textarea': {
      resize: 'vertical',
      width: '100%',
    },
    '&, input': {
      '&:focus': {
        outline: 'none',
      },
      [`&.${fieldInputHiddenCID}`]: {
        border: 0,
        display: 'none',
      },
      boxSizing: 'border-box',
      [`&.${fieldInputSelectCID}`]: {
        '& > div': {
          width: '100%',
        },
        '& input': {
          padding: '0.5rem 1.3rem',
          width: '100%',
        },
        '& ul': {
          width: '100%',
        },
        MozAppearance: 'menulist-button',
        WebkitAppearance: 'menulist-button',
        minWidth: '3em',
        padding: 0,
        width: 'auto',
      },
      width: '100%',
    },
    [`& .${fieldInputCheckboxCID}`]: {
      '& > input': {
        MozAppearance: 'checkbox',
        WebkitAppearance: 'checkbox',
        marginRight: '.5em',
        position: 'relative',
        top: '1px',
        width: 'auto',
      },
      '& label, input': {
        cursor: 'pointer',
      },
    },
    display: 'flex',
    fontFamily: theme.typography.fontFamily,
    fontSize: '1em',
    margin: '0',
    padding: '10px',
  },
  fieldListElement: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 2px',
  },
  fieldVariantDefault: {
    marginBottom: '1em',
    [`& .${fieldInputCID}`]: {
      '&:hover': {
        borderColor: theme.palette.grey.light,
      },
      backgroundColor: theme.palette.grey.xxLight,
      border: theme.greyBorder,
      borderRadius: '5px',
      [`&.${fieldInputMarkdownCID}`]: {
        background: 'none',
        border: 0,
        display: 'flex',
        flex: 1,
        padding: 0,
        position: 'relative',
        width: '100%',
      },
      flexGrow: 1,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      transition: 'border-color .2s, background-color .2s',
      width: 'auto',
      [`&.${fieldInputSelectCID}`]: {
        border: 'unset',
      },
    },
    [`& .${fieldInputCheckboxCID}`]: {
      alignItems: 'baseline',
      backgroundColor: 'inherit',
      border: 0,
      padding: 0,
      [`& .${fieldLabelCID}`]: {
        color: theme.palette.grey.xDark,
        fontWeight: 'normal',
        paddingBottom: 0,
      },
    },
    [`&.${fieldActiveCID}`]: {
      [`& .${fieldInputCID}`]: {
        backgroundColor: theme.palette.common.white,
        borderColor: theme.palette.grey.light,
        outlineOffset: '2px',
      },
    },
    [`& .${fieldLabelCID}`]: {
      '&-required': {
        color: theme.palette.red.main,
      },
      margin: 0,
      paddingBottom: '.3rem',
    },
  },
  fieldVariantPreview: {
    [`& .${fieldInputCID}`]: {
      '&:hover': {
        boxShadow: `inset 5px 0 0 ${theme.palette.grey.light}`,
      },
      [`&.${fieldInputSelectCID}`]: {
        padding: '0',
      },
      background: 'none',
      border: '0',
      borderRadius: '0',
      margin: '0',
      padding: '10px 20px',
      transition: 'box-shadow .2s',
      width: '100%',
    },
    [`& .${fieldActiveCID}`]: {
      [`& .${fieldInputCID}`]: {
        boxShadow: `inset 5px 0 0 ${theme.palette.grey.main}`,
      },
    },
  },
}));

/**
 * Creates a field for forms.
 *
 * Import with the async container.
 *
 * @returns {component} Component
 */
const FormField = (props: FormFieldProps): JSX.Element => {
  const {
    className,
    combinedComponent,
    ...contextProps
  } = props;

  return (
    <ResourceBoundary
      subject={contextProps.path}
      wrapperProps={{ className }}
    >
      <FormFieldContext.Provider value={contextProps}>
        <FormFieldLabel />
        <FormFieldDescription />
        {combinedComponent ? <props.inputComponent /> : <FormInputs />}
      </FormFieldContext.Provider>
    </ResourceBoundary>
  );
};

FormField.defaultProps = {
  combinedComponent: false,
  inputErrors: [],
  meta: {},
  onBlur: () => undefined,
  onFocus: () => undefined,
};

export default FormField;
