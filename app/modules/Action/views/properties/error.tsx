import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register, 
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../topologies';
import Markdown from '../../../Common/components/Markdown';

const Error: FC<PropertyProps> = ({ linkedProp }) => <Markdown text={linkedProp.value} />;

Error.type = schema.Action;

Error.property = schema.error;

Error.topology = allTopologies;

export default register(Error);
