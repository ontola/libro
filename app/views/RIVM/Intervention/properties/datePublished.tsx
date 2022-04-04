import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';
import { FormattedDate } from 'react-intl';

import rivm from '../../../../ontology/rivm';
import { attributeListTopology } from '../../../../topologies';

const DatePublished: FC<PropertyProps> = ({ linkedProp }) => <FormattedDate value={linkedProp.value} />;

DatePublished.type = rivm.Intervention;

DatePublished.topology = attributeListTopology;

DatePublished.property = schema.datePublished;

export default register(DatePublished);
