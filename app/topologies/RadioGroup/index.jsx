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
import { FormattedMessage } from 'react-intl';

import { LoadingRow } from '../../components/Loading';
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
      items,
      loading,
      name,
      onChange,
      required,
      value,
    } = this.props;

    if (loading) {
      return <LoadingRow />;
    }

    if (items.length === 0) {
      return (
        <FormattedMessage
          defaultMessage="No options available"
          id="https://app.argu.co/i18n/forms/radioGroup/noOptions"
        />
      );
    }

    return this.wrap((
      <MaterialRadioGroup
        value={value}
        onChange={onChange}
      >
        {
          items.map((option) => (
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
  items: PropTypes.arrayOf(linkType),
  loading: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: linkType,
};

export default RadioGroup;
