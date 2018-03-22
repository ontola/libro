import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { ProfileCard } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import Detail from './detail';
import Sidebar from './sidebar';
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
    () => <Property label={NS.schema('image')} />,
    [NS.schema('Person'), NS.aod('Persons')],
    RENDER_CLASS_NAME,
    NS.argu('voteBubble')
  ),
  Detail,
  Sidebar,
  Image,
];
