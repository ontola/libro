import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import argu from '../../ontology/argu';
import { parentTopology } from '../../topologies/Parent';

interface VocabularyParentProps {
  name?: SomeTerm;
}

const VocabularyParent: FC<VocabularyParentProps> = ({
  name,
}) => (
  <Breadcrumb
    data-test="Thing-parent"
    label={<Property label={[schema.name, as.name]} />}
    title={name?.value}
  />
);

VocabularyParent.type = argu.Vocabulary;

VocabularyParent.topology = parentTopology;

VocabularyParent.mapDataToProps = {
  name: [schema.name, as.name],
};

export default register(VocabularyParent);
