import schema from '@ontologies/schema';
import { register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ll from '../../ontology/ll';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

import EntryPointBase from './EntryPointBase';
import EntryPointForm from './EntryPointForm';

class EntryPointOmniform extends EntryPointBase {
  static propTypes = {
    autofocusForm: PropTypes.bool,
    formID: PropTypes.string,
    formInstance: PropTypes.objectOf(PropTypes.any),
    onKeyUp: PropTypes.func,
    sessionStore: PropTypes.objectOf(PropTypes.any),
    /** The ids of the whitelisted properties */
    whitelist: PropTypes.arrayOf(PropTypes.number),
  };

  render() {
    const {
      action,
      actionBody,
      autofocusForm,
      footerButtons,
      formInstance,
      httpMethod,
      lrs,
      onKeyUp,
      parentIRI,
      sessionStore,
      subject,
      url,
      whitelist,
    } = this.props;
    const object = lrs.getResourceProperty(action, schema.object);
    const formID = `${atob(parentIRI)}.omniform`;

    return (
      <EntryPointForm
        actionBody={actionBody}
        autofocusForm={autofocusForm}
        entryPoint={subject}
        footerButtons={footerButtons}
        formID={formID}
        formInstance={formInstance}
        httpMethod={httpMethod?.value}
        object={object}
        sessionStore={sessionStore}
        theme="omniform"
        url={url?.value}
        whitelist={whitelist}
        onKeyUp={onKeyUp}
        onSubmit={this.submitHandler}
      />
    );
  }
}

EntryPointOmniform.type = schema.EntryPoint;

EntryPointOmniform.topology = omniformFieldsTopology;

EntryPointOmniform.mapDataToProps = {
  action: schema.isPartOf,
  actionBody: ll.actionBody,
  httpMethod: schema.httpMethod,
  image: schema.image,
  name: schema.name,
  url: schema.url,
};

export default register(EntryPointOmniform);
