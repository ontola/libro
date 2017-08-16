import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  Widget,
} from 'components';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/voteCompareCells';

const VoteCompareRows = () => (
  <Widget
    title="Gelijkenis"
    description={'Berekend met het stemgedrag van de partijleden op moties. ' +
    'Klik op een partij om te zien waarover ze verschillend stemden.'}
  >
    <Property label={NS.argu('compareCells')} />
  </Widget>
);

LinkedRenderStore.registerRenderer(VoteCompareRows, NS.argu('CompareRow'));
LinkedRenderStore.registerRenderer(
  VoteCompareRows,
  NS.argu('CompareRow'),
  RENDER_CLASS_NAME,
  NS.argu('collection')
);
