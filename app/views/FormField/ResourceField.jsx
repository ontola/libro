import rdf from '@ontologies/core';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import {
  Property,
  Resource,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { FormContext } from '../../components/Form/Form';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const ResourceField = ({
  path,
  setHasContent,
}) => {
  const { object, whitelist } = React.useContext(FormContext);
  React.useLayoutEffect(() => {
    if (setHasContent) {
      setHasContent(true);
    }
  });

  const whitelisted = !whitelist || whitelist.includes(rdf.id(path));
  if (!whitelisted) {
    return null;
  }

  if (object && path) {
    return (
      <Resource subject={object}>
        <Property label={path} />
      </Resource>
    );
  }

  return (
    <React.Fragment>
      <Property label={[rdfs.label, schema.name, sh.name]} size="3" />
      <Property label={[schema.text, sh.description]} />
      <div><Property label={schema.url} /></div>
    </React.Fragment>
  );
};

ResourceField.type = form.ResourceField;

ResourceField.topology = allTopologies;

ResourceField.mapDataToProps = {
  path: sh.path,
};

ResourceField.propTypes = {
  path: linkType,
  setHasContent: PropTypes.func,
};

export default register(ResourceField);
