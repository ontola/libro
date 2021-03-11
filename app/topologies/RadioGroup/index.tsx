import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import MaterialRadioGroup from '@material-ui/core/RadioGroup';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { SomeTerm } from '@ontologies/core';
import { Resource } from 'link-redux';
import React, { EventHandler } from 'react';

import { isResource } from '../../helpers/types';
import { InputValue } from '../../hooks/useFormField';
import argu from '../../ontology/argu';
import Topology from '../Topology';

export const radioGroupTopology = argu.ns('radioGroup');

interface PropTypes {
  loading?: boolean;
  name?: string;
  onChange: EventHandler<any>;
  options: SomeTerm[];
  required?: boolean;
  value?: InputValue;
}

class RadioGroup extends Topology<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.topology = radioGroupTopology;
  }

  public render() {
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
        onChange={(_, v) => (
          onChange(options.find((option) => option.value === v))
        )}
      >
        {options.map((option) => (
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
        ))}
      </MaterialRadioGroup>
    ));
  }
}

export default RadioGroup;
