import {
  Property,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { formFieldError } from '../../components/FormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const ActionBody = ({
  autofocusForm,
  contentWrapper,
  formIRI,
  object,
  onKeyUp,
  sessionStore,
  submissionErrors,
  theme,
  whitelist,
}) => (
  <Property
    childProps={{
      autofocusForm,
      formIRI,
      object,
      onKeyUp,
      sessionStore,
      submissionErrors,
      theme,
      whitelist,
    }}
    itemWrapper={contentWrapper}
    itemWrapperOpts={contentWrapper === CardContent ? { noStartSpacing: true } : {}}
    label={form.pages}
  />
);

ActionBody.type = form.Form;

ActionBody.topology = allTopologies;

ActionBody.propTypes = {
  autofocusForm: PropTypes.bool,
  contentWrapper: PropTypes.elementType,
  formIRI: linkType,
  object: linkType,
  onKeyUp: PropTypes.func,
  sessionStore: PropTypes.objectOf(PropTypes.any),
  submissionErrors: PropTypes.objectOf(PropTypes.arrayOf(formFieldError)),
  theme: PropTypes.string,
  whitelist: PropTypes.arrayOf(PropTypes.number),
};

ActionBody.mapDataToProps = {
  pages: form.pages,
};

ActionBody.defaultProps = {
  autofocusForm: false,
};

export default register(ActionBody);
