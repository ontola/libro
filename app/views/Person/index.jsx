import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, link } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';

import PersonDetail from './PersonDetail';
import PersonNavbar from './PersonNavbar';
import PersonPage from './PersonFull';
import PersonSelect from './PersonSelect';
import Email from './properties/email';
import Image from './properties/image';
import Section from './section';

export default [
  PersonNavbar,
  PersonPage,
  PersonSelect,
  LinkedRenderStore.registerRenderer(
    link({ name: schema.name }, { returnType: 'value' })(({ name }) => (
      <Property ariaLabel={name} label={schema.image} />
    )),
    [schema.Person, argu.Page],
    RENDER_CLASS_NAME,
    [argu.voteBubble, formFooterTopology]
  ),
  PersonDetail,
  Email,
  Image,
  Section,
];
