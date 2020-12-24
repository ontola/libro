import ToggleButton from '@material-ui/lab/ToggleButton';
import MaterialToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/styles';
import {
  Resource,
  linkType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { isResource } from '../../helpers/types';
import useFieldOptions from '../../hooks/useFieldOptions';
import { inlineTopology } from '../../topologies/Inline';
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

const ToggleButtonGroup = ({
  name,
  required,
  inputValue,
  onChange,
}) => {
  const {
    loading,
    options,
  } = useFieldOptions();
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
      {required && <HiddenRequiredInput value={inputValue?.value} />}
      <MaterialToggleButtonGroup
        exclusive
        className={classes.buttonGroup}
        value={inputValue?.value}
        onChange={(event, v) => {
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

ToggleButtonGroup.propTypes = {
  inputValue: linkType,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default ToggleButtonGroup;
