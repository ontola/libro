import ToggleButton from '@material-ui/lab/ToggleButton';
import MaterialToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/styles';
import { Resource } from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { isResource } from '../../helpers/types';
import useFieldOptions from '../../hooks/useFieldOptions';
import { inlineTopology } from '../../topologies/Inline';
import { InputComponentProps } from '../FormField/InputComponentProps';
import HiddenRequiredInput from '../Input/HiddenRequiredInput';
import { LoadingRow } from '../Loading';

const useStyles = makeStyles(() => ({
  button: {
    flexGrow: 1,
    padding: '.4em .8em',
    textTransform: 'initial',
  },
  buttonGroup: {
    width: '100%',
  },
}));

const ToggleButtonGroup: React.FC<InputComponentProps> = ({
  name,
  fieldShape,
  inputValue,
  onChange,
}) => {
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
      {required && <HiddenRequiredInput name={name} value={inputValue?.value} />}
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
              ? <Resource subject={option} topology={inlineTopology} />
              : option.value}
          </ToggleButton>
        ))}
      </MaterialToggleButtonGroup>
    </React.Fragment>
  );
};

export default ToggleButtonGroup;
