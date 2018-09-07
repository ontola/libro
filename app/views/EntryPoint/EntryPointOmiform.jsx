import {
  linkType,
  Property,
  register,
  withLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import EntryPointBase from './EntryPointBase';

class EntryPointOmniform extends EntryPointBase {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
  }

  render() {
    return (
      <Property
        autofocusForm={this.props.autofocusForm}
        label={NS.ll('actionBody')}
        theme="omniform"
        whitelist={this.props.whitelist}
        onKeyUp={this.props.onKeyUp}
      />
    );
  }
}

EntryPointOmniform.propTypes = {
  invalid: PropTypes.bool,
  onStatusForbidden: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  url: linkType,
};

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
EntryPointOmniformWrapper.topology = NS.argu('omniformFields');
EntryPointOmniformWrapper.type = NS.schema('EntryPoint');

export default register(EntryPointOmniformWrapper);
