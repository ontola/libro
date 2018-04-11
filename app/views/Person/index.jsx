import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  linkedPropType,
  LinkedResourceContainer,
  Property,
} from 'link-redux';
import React from 'react';

import {
  Container,
  PageHeader,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import Detail from './detail';
import Section from './section';
import Sidebar from './sidebar';
import Email from './properties/email';
import Image from './properties/image';

function feedForSubject(subject) {
  const site = subject.site().value;

  return NS.app(`${subject.value}/feed?type=paginated`.split(site).pop());
}

const propTypes = {
  subject: linkedPropType,
};

const PersonPage = ({ subject }) => (
  <React.Fragment>
    <PageHeader>
      <Property label={NS.schema('name')} />
      <Property label={NS.schema('description')} />
    </PageHeader>
    <Container>
      <LinkedResourceContainer subject={feedForSubject(subject)} />
    </Container>
  </React.Fragment>
);

PersonPage.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    PersonPage,
    [
      NS.schema('Person'),
      NS.foaf('Person'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.schema('name')], { returnType: 'value' })(({ name }) => (
      <Property ariaLabel={name} label={NS.schema('image')} />
    )),
    [NS.schema('Person'), NS.aod('Persons')],
    RENDER_CLASS_NAME,
    [NS.argu('voteEventSide'), NS.argu('voteBubble'), NS.argu('formFooter')]
  ),
  Detail,
  Email,
  Image,
  Section,
  Sidebar,
];
