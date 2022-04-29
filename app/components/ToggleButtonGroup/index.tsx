import ToggleButton from '@mui/material/ToggleButton';
import MaterialToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import { Property, Resource } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { isResource } from '../../helpers/types';
import useFieldOptions from '../../hooks/useFieldOptions';
import { LibroTheme } from '../../themes/themes';
import { inlineTopology } from '../../topologies';
import { formFieldContext } from '../FormField/FormFieldContext';
import { InputComponentProps } from '../FormField/FormFieldTypes';
import HiddenRequiredInput from '../Input/HiddenRequiredInput';
import { LoadingRow } from '../Loading';

const useStyles = makeStyles((theme: LibroTheme) => ({
  button: {
    flexGrow: 1,
    padding: '.4em .8em',
    textTransform: 'initial',
  },
  buttonGroup: {
    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    '& .MuiToggleButton-root:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
    width: '100%',
  },
}));

const ToggleButtonGroup: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const {
    name,
    fieldShape,
  } = React.useContext(formFieldContext);
  const {
    required,
    shIn,
  } = fieldShape;
  const {
    loading,
    options,
  } = useFieldOptions(shIn);
  const classes = useStyles();

  if (loading) {
    return <LoadingRow />;
  }

  if (options.length === 0) {
    return (
      <FormattedMessage
        defaultMessage="No options available"
        id="https://app.argu.co/i18n/forms/radioGroup/noOptions"
      />
    );
  }

  return (
    <React.Fragment>
      {required && (
        <HiddenRequiredInput
          name={name}
          value={inputValue?.value}
        />
      )}
      <MaterialToggleButtonGroup
        exclusive
        className={classes.buttonGroup}
        value={inputValue?.value}
        onChange={(_, v) => {
          const option = options.find((o) => o.value === v);

          if (option) {
            onChange(option);
          }
        }}
      >
        {options.map((option) => (
          <ToggleButton
            aria-label={name}
            className={classes.button}
            key={option.value}
            value={option.value}
          >
            {isResource(option)
              ? (
                <Resource subject={option}>
                  <Property
                    label={schema.name}
                    topology={inlineTopology}
                  />
                </Resource>
              )
              : option.value}
          </ToggleButton>
        ))}
      </MaterialToggleButtonGroup>
    </React.Fragment>
  );
};

export default ToggleButtonGroup;
