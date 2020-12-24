import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import MaterialRadioGroup from '@material-ui/core/RadioGroup';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import {
  Resource,
  linkType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';
import { isResource } from '../../helpers/types';

export const radioGroupTopology = argu.ns('radioGroup');

class RadioGroup extends Topology {
  constructor(props) {
    super(props);

    this.topology = radioGroupTopology;
  }

  render() {
    const {
      name,
      onChange,
      options,
      required,
      value,
    } = this.props;

    return this.wrap((
      <MaterialRadioGroup
        value={value?.value}
        onChange={(event, v) => (
          onChange(options.find((option) => option.value === v))
        )}
      >
        {
          options.map((option) => (
            <FormControlLabel
              control={(
                <Radio
                  checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                  icon={<RadioButtonUncheckedIcon fontSize="small" />}
                  name={name}
                  required={required}
                />
              )}
              key={option.value}
              label={isResource(option) ? <Resource subject={option} /> : option.value}
              value={option.value}
            />
          ))
        }
      </MaterialRadioGroup>
    ));
  }
}

RadioGroup.propTypes = {
  loading: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(linkType),
  required: PropTypes.bool,
  value: linkType,
};

export default RadioGroup;
