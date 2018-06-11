import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  linkType,
  Property, withLRS,
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
        label={NS.ll('actionBody')}
        theme="omniform"
        whitelist={this.props.whitelist}
        onKeyUp={this.props.onKeyUp}
      />
    );
  }
}

EntryPointOmniform.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  url: linkType,
};

const EntryPointOmniformForm = link([
  NS.schema('image'),
  NS.schema('name'),
  NS.schema('url'),
  NS.schema('httpMethod'),
])(EntryPointOmniform);

export default LinkedRenderStore.registerRenderer(
  withLRS(props => (
    <EntryPointOmniformForm
      form={props.subject.value}
      {...props}
    />
  )),
  NS.schema('EntryPoint'),
  RENDER_CLASS_NAME,
  NS.argu('omniformFields')
);
