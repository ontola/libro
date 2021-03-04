import rdf, { NamedNode } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import { ResourcePropTypes } from 'link-redux/dist-types/components/Resource';
import React from 'react';

import { FormContext } from '../../components/Form/Form';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';
import { useFormGroup } from '../FormGroup/FormGroupProvider';

interface PropTypes extends ResourcePropTypes {
  path: NamedNode;
}

const ResourceField: FC<PropTypes> = ({
  path,
}) => {
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

export default register(ResourceField);
