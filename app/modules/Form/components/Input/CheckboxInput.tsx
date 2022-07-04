import { Checkbox, FormControlLabel } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { useStrings } from 'link-redux';
import React from 'react';

import { BreakPoints, LibroTheme } from '../../../Kernel/lib/themes';
import { SHADOW } from '../../../Common/lib/flow';
import { FormTheme, formContext } from '../Form/FormContext';
import { formFieldContext } from '../FormField/FormFieldContext';
import { InputComponentProps } from '../FormField/FormFieldTypes';
import {
  fieldInputCID,
  fieldInputCheckboxCID,
  useFormStyles,
} from '../FormField/UseFormStyles';

export const useCheckboxStyles = makeStyles<LibroTheme>((theme) => ({
  checkBoxWrapper: {
    '& label': {
      alignSelf: 'center',
    },
    alignItems: 'center',
    display: 'flex',
  },
  flowCheckBox: {
    '& .MuiIconButton-root': {
      paddingLeft: '0px',
    },
    '& label': {
      [theme.breakpoints.up(BreakPoints.Medium)]: {
        fontSize: '1.1rem',
      },
      fontSize: '1rem',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& svg': {
      [theme.breakpoints.up(BreakPoints.Medium)]: {
        fontSize: '2rem',
        marginBottom: '.5rem',
        marginTop: '.5rem',
      },
      color: theme.palette.primary.main,
      filter: `drop-shadow(${SHADOW})`,
      fontSize: '1.6rem',
    },
  },
}));

const CheckboxInput = ({
  inputValue,
}: InputComponentProps): JSX.Element => {
  const classes = useCheckboxStyles();
  const formClasses = useFormStyles();
  const { theme } = React.useContext(formContext);
  const { name, onChange } = React.useContext(formFieldContext);
  const [label] = useStrings(schema.name);
  const checkBoxClassName = clsx({
    [formClasses.fieldInput]: true,
    [fieldInputCID]: true,
    [fieldInputCheckboxCID]: true,
    [classes.checkBoxWrapper]: true,
    [classes.flowCheckBox]: theme === FormTheme.Flow,
  });
  const handleChange = React.useCallback<(event: React.SyntheticEvent, checked: boolean) => void>(
    (_, checked) => onChange([rdf.literal(checked)]),
  [onChange],
  );

  return (
    <div className={checkBoxClassName}>
      <FormControlLabel
        checked={inputValue.value === 'true'}
        control={<Checkbox color="primary" />}
        label={label}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default CheckboxInput;
