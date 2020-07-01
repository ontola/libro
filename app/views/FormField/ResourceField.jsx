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

import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const ResourceField = ({
  object,
  path,
  setHasContent,
}) => {
  React.useLayoutEffect(() => {
    if (setHasContent) {
      setHasContent(true);
    }
  });

  if (object && path) {
    return (
      <Resource subject={object}>
        <Property label={path} />
      </Resource>
    );
  }

  return (
    <React.Fragment>
      <Property label={[rdfs.label, sh.name]} />
      <Property label={sh.description} />
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
  object: linkType,
  path: linkType,
  setHasContent: PropTypes.func,
};

export default register(ResourceField);
