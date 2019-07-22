import {
  LinkedResourceContainer,
  linkType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Select from '../../topologies/Select';
import { Input } from '../Input';
import FieldLabel from '../FieldLabel';
import Spinner from '../Spinner';

function handleChange(e, props) {
  const value = props.value?.slice() || [];
  if (e.target.checked) {
    value.push(e.target.id);
  } else {
    const index = value.indexOf(e.target.id);
    if (index !== -1) {
      value.splice(index, 1);
    }
  }
  props.onChange(value);
}

function CheckboxesInput(props) {
  const {
    loading,
    options,
    sharedProps,
  } = props;

  if (loading) {
    return <Spinner loading />;
  }

  if (options.length === 0) {
    return <FormattedMessage id="https://app.argu.co/i18n/collection/empty/message" />;
  }

  const items = options.map((item) => {
    const label = (
      <LinkedResourceContainer subject={item} />
    );

    return (
      <div className="Field__input Field__input--checkbox" key={`checkbox-${item.value}`}>
        <Input
          checked={props.value && props.value.indexOf(item.value) !== -1}
          id={item.value}
          name={sharedProps.name}
          type="checkbox"
          onChange={e => handleChange(e, props)}
        />
        <FieldLabel
          htmlFor={item.value}
          label={label}
        />
      </div>
    );
  });

  return <Select>{items}</Select>;
}

CheckboxesInput.propTypes = {
  loading: PropTypes.bool,
  options: PropTypes.arrayOf(linkType),
  sharedProps: PropTypes.shape({
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
  value: PropTypes.arrayOf(linkType),
};

export default CheckboxesInput;
