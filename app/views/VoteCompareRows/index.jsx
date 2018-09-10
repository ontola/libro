import LinkedRenderStore from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import Widget from '../../components/Widget';
import { NS } from '../../helpers/LinkedRenderStore';

import './properties/voteCompareCells';

const VoteCompareRows = () => (
  <Widget
    description={'Berekend met het stemgedrag van de partijleden op moties. '
    + 'Klik op een partij om te zien waarover ze verschillend stemden.'}
    title="Gelijkenis"
  >
    <Property label={NS.argu('compareCells')} />
  </Widget>
);

LinkedRenderStore.registerRenderer(VoteCompareRows, NS.argu('CompareRow'));
