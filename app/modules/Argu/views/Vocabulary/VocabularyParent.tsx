import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Breadcrumb from '../../../Common/components/Breadcrumbs/Breadcrumb';
import { parentTopology } from '../../../Common/topologies';
import argu from '../../ontology/argu';

const VocabularyParent = () => {
  const [name] = useProperty([schema.name, as.name]);

  return (
    <Breadcrumb
      data-test="Thing-parent"
      label={<Property label={[schema.name, as.name]} />}
      title={name?.value}
    />
  );
};

VocabularyParent.type = argu.Vocabulary;

VocabularyParent.topology = parentTopology;

export default register(VocabularyParent);
