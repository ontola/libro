import schema from '@ontologies/schema';
import {
  linkType,
  register,
  subjectType,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ll from '../../ontology/ll';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

import EntryPointForm from './EntryPointForm';
import useSubmitHandler from './useSubmitHandler';

const EntryPointOmniform = (props) => {
  const {
    action,
    actionBody,
    autofocusForm,
    footerButtons,
    formInstance,
    httpMethod,
    onKeyUp,
    parentIRI,
    sessionStore,
    subject,
    url,
    whitelist,
  } = props;
  const submitHandler = useSubmitHandler(props);
  const [object] = useResourceProperty(action, schema.object);
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
      onSubmit={submitHandler}
    />
  );
};

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

EntryPointOmniform.propTypes = {
  action: linkType,
  actionBody: linkType,
  autofocusForm: PropTypes.bool,
  footerButtons: PropTypes.func,
  formInstance: PropTypes.objectOf(PropTypes.any),
  httpMethod: linkType,
  onKeyUp: PropTypes.func,
  parentIRI: linkType,
  sessionStore: PropTypes.objectOf(PropTypes.any),
  subject: subjectType,
  url: linkType,
  /** The ids of the whitelisted properties */
  whitelist: PropTypes.arrayOf(PropTypes.number),
};

export default register(EntryPointOmniform);
