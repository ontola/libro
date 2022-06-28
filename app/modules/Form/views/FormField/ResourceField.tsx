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

import form from '../../ontology/form';
import { formFieldTopologies } from '../../../../topologies';
import { formContext } from '../../components/Form/FormContext';
import { useFormStyles } from '../../components/FormField/UseFormStyles';
import { useFormGroup } from '../FormGroup/FormGroupProvider';

const ResourceField = () => {
  const classes = useFormStyles();
  const [path] = useProperty(sh.path);
  const { object, whitelist } = React.useContext(formContext);
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
      <div className={classes.fieldLink}>
        <Property label={schema.url} />
      </div>
    </React.Fragment>
  );
};

ResourceField.type = form.ResourceField;

ResourceField.topology = formFieldTopologies;

export default register(ResourceField);