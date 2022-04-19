import * as foaf from '@ontologies/foaf';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../topologies';

const PersonalProfileDocument: FC  = (props) => (
  <Property
    {...props}
    label={foaf.primaryTopic}
  />
);

PersonalProfileDocument.type = foaf.PersonalProfileDocument;

PersonalProfileDocument.topology = allTopologies;

export default register(PersonalProfileDocument);
