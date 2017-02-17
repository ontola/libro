import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  Widget,
} from 'components';

import './properties/voteCompareCells';

const VoteCompareRows = () => (
  <Widget
    title="Gelijkenis"
    description={'Berekend met het stemgedrag van de partijleden op moties. ' +
    'Klik op een partij om te zien waarover ze verschillend stemden.'}
  >
    <Property label="argu:compareCells" />
  </Widget>
);

LinkedRenderStore.registerRenderer(VoteCompareRows, 'argu:CompareRow');
LinkedRenderStore.registerRenderer(
  VoteCompareRows,
  'argu:CompareRow',
  RENDER_CLASS_NAME,
  'collection'
);
