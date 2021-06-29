import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  ReturnType,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { formFooterTopology } from '../../topologies/FormFooter';

interface PersonFooterProps {
  name: string;
}

const PersonFooter: FC<PersonFooterProps> = ({
  name,
}) => (
  <Property ariaLabel={name} label={schema.image} />
);

PersonFooter.type = [schema.Person, argu.Page];

PersonFooter.topology = [argu.voteBubble, formFooterTopology];

PersonFooter.mapDataToProps = {
  name: {
    label: schema.name,
    returnType: ReturnType.Value,
  },
};

export default register(PersonFooter);
