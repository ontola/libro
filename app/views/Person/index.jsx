import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import { voteEventSideTopology } from '../../topologies/VoteEventSide';

import Detail from './detail';
import PersonPage from './PersonPage';
import Email from './properties/email';
import Image from './properties/image';
import Section from './section';
import Sidebar from './sidebar';

export default [
  PersonPage,
  LinkedRenderStore.registerRenderer(
    link([NS.schema('name')], { returnType: 'value' })(({ name }) => (
      <Property ariaLabel={name} label={NS.schema('image')} />
    )),
    [NS.schema('Person'), NS.aod('Persons')],
    RENDER_CLASS_NAME,
    [voteEventSideTopology, NS.argu('voteBubble'), formFooterTopology]
  ),
  Detail,
  Email,
  Image,
  Section,
  Sidebar,
];
