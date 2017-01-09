import React from 'react';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import '../VoteData/VoteData.scss';
import {
  LinkedDetailDate,
} from 'components';

const VoteEvent = () => (
  <div className="VoteData">
    <Property label="schema:result" />
    <LinkedDetailDate />
    <Property label="argu:votes" />
    <Property label="argu:counts" />
  </div>
);

LinkedRenderStore.registerRenderer(VoteEvent, ['argu:VoteEvent', 'aod:VoteEvent']);
LinkedRenderStore.registerRenderer(
  VoteEvent,
  ['argu:VoteEvent', 'aod:VoteEvent'],
  RENDER_CLASS_NAME,
  'collection'
);

import './properties/votes';
