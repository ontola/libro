import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, Property } from 'link-redux';
import React from 'react';

import { ProfileCard } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import Detail from './detail';
import Section from './section';
import Sidebar from './sidebar';
import Email from './properties/email';
import Image from './properties/image';

export default [
  LinkedRenderStore.registerRenderer(
    ProfileCard,
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
