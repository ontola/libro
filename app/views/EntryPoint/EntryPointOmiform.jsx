import {
  Property,
  register,
  withLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

import EntryPointBase from './EntryPointBase';

class EntryPointOmniform extends EntryPointBase {
  static propTypes = {
    autofocusForm: PropTypes.bool,
    onKeyUp: PropTypes.func,
    whitelist: PropTypes.arrayOf(PropTypes.object),
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
        label={NS.ll('actionBody')}
        theme="omniform"
        whitelist={whitelist}
        onKeyUp={onKeyUp}
      />
    );
  }
}

const EntryPointOmniformWrapper = withLRS(props => (
  <EntryPointOmniform
    form={props.subject.value}
    {...props}
  />
));

EntryPointOmniformWrapper.mapDataToProps = [
  NS.schema('image'),
  NS.schema('name'),
  NS.schema('url'),
  NS.schema('httpMethod'),
];
EntryPointOmniformWrapper.topology = omniformFieldsTopology;
EntryPointOmniformWrapper.type = NS.schema('EntryPoint');

export default register(EntryPointOmniformWrapper);
