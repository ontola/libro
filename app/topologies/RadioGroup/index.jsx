import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import MaterialRadioGroup from '@material-ui/core/RadioGroup';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import {
  LinkedResourceContainer,
  linkType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LoadingRow } from '../../components/Loading';
import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

export const radioGroupTopology = NS.argu('radioGroup');

class RadioGroup extends Topology {
  constructor(props) {
    super(props);

    this.topology = radioGroupTopology;
  }

  render() {
    const {
      items,
      loading,
      onChange,
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
          items.map(option => (
            <FormControlLabel
              control={(
                <Radio
                  checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                  icon={<RadioButtonUncheckedIcon fontSize="small" />}
                />
              )}
              key={option.value}
              label={<LinkedResourceContainer subject={option} />}
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
  onChange: PropTypes.func,
  value: linkType,
};

export default RadioGroup;
