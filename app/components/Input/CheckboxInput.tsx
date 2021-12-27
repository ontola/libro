import { FormControlLabel } from '@material-ui/core';
import CheckBox from '@material-ui/core/Checkbox';
import makeStyles from '@material-ui/styles/makeStyles';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { useStrings } from 'link-redux';
import React from 'react';

import { SHADOW } from '../../helpers/flow';
import { LibroTheme } from '../../themes/themes';
import { FormContext, FormTheme } from '../Form/Form';
import {
  FormFieldContext,
  fieldInputCID,
  fieldInputCheckboxCID, 
} from '../FormField/FormField';
import { InputComponentProps } from '../FormField/InputComponentProps';

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
      [theme.breakpoints.up('md')]: {
        fontSize: '1.1rem',
      },
      fontSize: '1rem',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& svg': {
      [theme.breakpoints.up('md')]: {
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
  const { theme } = React.useContext(FormContext);
  const { name, onChange } = React.useContext(FormFieldContext);
  const [label] = useStrings(schema.name);
  const checkBoxClassName = clsx({
    'Field__input': true,
    [fieldInputCID]: true,
    [fieldInputCheckboxCID]: true,
    [classes.checkBoxWrapper]: true,
    [classes.flowCheckBox]: theme === FormTheme.Flow,
  });
  const handleChange = React.useCallback(
    (e) => onChange([rdf.literal(e.target.checked)]),
    [onChange],
  );

  return (
    <div className={checkBoxClassName}>
      <FormControlLabel
        checked={inputValue.value === 'true'}
        control={<CheckBox color="primary" />}
        label={label}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default CheckboxInput;
