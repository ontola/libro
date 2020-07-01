import {
  Property,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const ActionBody = ({
  autofocusForm,
  formIRI,
  object,
  onKeyUp,
  sessionStore,
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
      theme,
      whitelist,
    }}
    label={form.pages}
  />
);

ActionBody.type = form.Form;

ActionBody.topology = allTopologies;

ActionBody.propTypes = {
  autofocusForm: PropTypes.bool,
  formIRI: linkType,
  object: linkType,
  onKeyUp: PropTypes.func,
  sessionStore: PropTypes.objectOf(PropTypes.any),
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
