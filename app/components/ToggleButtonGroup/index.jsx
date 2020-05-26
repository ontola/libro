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
  loading,
  name,
  onChange,
  options,
  required,
  value,
}) => {
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
      {required && <HiddenRequiredInput value={value} />}
      <MaterialToggleButtonGroup
        exclusive
        className={classes.buttonGroup}
        value={value}
        onChange={(event, v) => (
          onChange({ target: { value: options.find((option) => option.value === v) } })
        )}
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
  loading: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(linkType),
  required: PropTypes.bool,
  value: linkType,
};

export default ToggleButtonGroup;