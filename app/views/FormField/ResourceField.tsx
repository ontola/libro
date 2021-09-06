import rdf from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import {
  Property,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { FormContext } from '../../components/Form/Form';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';
import { useFormGroup } from '../FormGroup/FormGroupProvider';

const ResourceField = () => {
  const [path] = useProperty(sh.path);
  const { object, whitelist } = React.useContext(FormContext);
  const { setHasContent } = useFormGroup();
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
      <React.Fragment>
        <Property
          label={[rdfs.label, schema.name, sh.name]}
          size="3"
        />
        <Resource subject={object}>
          <Property label={path} />
        </Resource>
        <Property label={[schema.text, sh.description]} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Property
        label={[rdfs.label, schema.name, sh.name]}
        size="3"
      />
      <Property label={[schema.text, sh.description]} />
      <div>
        <Property label={schema.url} />
      </div>
    </React.Fragment>
  );
};

ResourceField.type = form.ResourceField;

ResourceField.topology = allTopologies;

export default register(ResourceField);
