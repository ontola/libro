import schema from '@ontologies/schema';
import {
  Property,
  register,
  withLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ll from '../../ontology/ll';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

import EntryPointBase from './EntryPointBase';

class EntryPointOmniform extends EntryPointBase {
  static propTypes = {
    autofocusForm: PropTypes.bool,
    onKeyUp: PropTypes.func,
    /** The ids of the whitelisted properties */
    whitelist: PropTypes.arrayOf(PropTypes.number),
  };

  render() {
    const {
      autofocusForm,
      onKeyUp,
      whitelist,
    } = this.props;

    return (
      <Property
        autofocusForm={autofocusForm}
        label={ll.actionBody}
        theme="omniform"
        whitelist={whitelist}
        onKeyUp={onKeyUp}
      />
    );
  }
}

const EntryPointOmniformWrapper = withLRS((props) => (
  <EntryPointOmniform
    form={props.subject.value}
    {...props}
  />
));

EntryPointOmniformWrapper.type = schema.EntryPoint;

EntryPointOmniformWrapper.topology = omniformFieldsTopology;

EntryPointOmniformWrapper.mapDataToProps = {
  httpMethod: schema.httpMethod,
  image: schema.image,
  name: schema.name,
  url: schema.url,
};

export default register(EntryPointOmniformWrapper);
